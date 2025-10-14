const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const crypto = require('crypto');
const testCaseService = require('./testCaseService');

class CodeExecutionService {
  // Execute code with test cases for a specific problem
  async executeWithTestCases(code, language, problemId) {
    const testConfig = testCaseService.getTestCases(problemId);

    if (!testConfig) {
      return { 
        passed: false, 
        score: 0, 
        runtime: 0, 
        error: 'No test cases found for this problem' 
      };
    }

    try {
      let passedTests = 0;
      const totalTests = testConfig.testCases.length;
      const startTime = Date.now();

      for (const testCase of testConfig.testCases) {
        const result = await this._runSingleTest(code, language, testCase, testConfig.functionName);
        if (result.passed) {
          passedTests++;
        }
      }

      const runtime = Date.now() - startTime;
      const score = Math.round((passedTests / totalTests) * 100);
      const passed = passedTests === totalTests;

      return { passed, score, runtime, passedTests, totalTests };
    } catch (error) {
      return { 
        passed: false, 
        score: 0, 
        runtime: 0, 
        error: error.message 
      };
    }
  }

  // Run a single test case
  async _runSingleTest(code, language, testCase, functionName) {
    return new Promise((resolve) => {
      if (language === 'javascript') {
        this._executeJavaScript(code, testCase, functionName, resolve);
      } else {
        resolve({ passed: false, error: 'Language not supported for testing' });
      }
    });
  }

  // Execute JavaScript code
  _executeJavaScript(code, testCase, functionName, resolve) {
    const tempFile = path.join(__dirname, `test_${crypto.randomBytes(8).toString('hex')}.js`);

    const testCode = `
${code}

// Test execution
try {
  const result = ${functionName}(${testCase.input.map(arg => JSON.stringify(arg)).join(', ')});
  console.log(JSON.stringify({ result, expected: ${JSON.stringify(testCase.expected)} }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
}
    `;

    try {
      fs.writeFileSync(tempFile, testCode, { mode: 0o600 });

      exec(`node "${tempFile}"`, {
        timeout: 5000,
        maxBuffer: 1024 * 1024,
        env: {}
      }, (error, stdout, stderr) => {
        // Clean up temp file
        try { fs.unlinkSync(tempFile); } catch {}

        if (error || stderr) {
          return resolve({ passed: false, error: error?.message || stderr });
        }

        try {
          const output = JSON.parse(stdout.trim());
          if (output.error) {
            return resolve({ passed: false, error: output.error });
          }

          const passed = JSON.stringify(output.result) === JSON.stringify(output.expected);
          resolve({ passed, actual: output.result, expected: output.expected });
        } catch (parseError) {
          resolve({ passed: false, error: 'Invalid output format' });
        }
      });
    } catch (err) {
      try { fs.unlinkSync(tempFile); } catch {}
      resolve({ passed: false, error: 'Execution setup failed' });
    }
  }
}

module.exports = new CodeExecutionService();
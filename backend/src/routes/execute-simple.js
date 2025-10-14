const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();

// Security limits
const EXECUTION_TIMEOUT = 5000; // 5 seconds
const MAX_OUTPUT_SIZE = 10000; // 10KB
const RATE_LIMIT = new Map(); // Simple rate limiting

router.post('/', async (req, res) => {
  const { code, language } = req.body;
  const clientIP = req.ip || req.connection.remoteAddress;
  
  // Rate limiting
  const now = Date.now();
  const userRequests = RATE_LIMIT.get(clientIP) || [];
  const recentRequests = userRequests.filter(time => now - time < 60000); // 1 minute
  
  if (recentRequests.length >= 10) {
    return res.status(429).json({ error: 'Too many requests. Please wait.' });
  }
  
  RATE_LIMIT.set(clientIP, [...recentRequests, now]);
  
  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language required' });
  }
  
  // Code validation
  if (code.length > 5000) {
    return res.status(400).json({ error: 'Code too long' });
  }
  
  // Dangerous patterns
  const dangerousPatterns = [
    /require\s*\(\s*['"]fs['"]/,
    /require\s*\(\s*['"]child_process['"]/,
    /import.*fs/,
    /eval\s*\(/,
    /exec\s*\(/,
    /system\s*\(/
  ];
  
  if (dangerousPatterns.some(pattern => pattern.test(code))) {
    return res.status(400).json({ error: 'Code contains potentially dangerous operations' });
  }
  
  try {
    if (language === 'javascript') {
      const tempFile = path.join(__dirname, `temp_${crypto.randomBytes(8).toString('hex')}.js`);
      
      try {
        fs.writeFileSync(tempFile, code, { mode: 0o600 }); // Restrict file permissions
        
        exec(`node "${tempFile}"`, { 
          timeout: EXECUTION_TIMEOUT,
          maxBuffer: MAX_OUTPUT_SIZE,
          env: {}
        }, (error, stdout, stderr) => {
          // Clean up file
          try { fs.unlinkSync(tempFile); } catch {}
          
          if (error) {
            if (error.code === 'TIMEOUT') {
              return res.json({ output: '', stderr: 'Execution timeout', exitCode: 1 });
            }
            return res.json({ output: '', stderr: error.message.substring(0, 1000), exitCode: 1 });
          }
          
          res.json({ 
            output: stdout.substring(0, MAX_OUTPUT_SIZE), 
            stderr: stderr.substring(0, 1000), 
            exitCode: 0 
          });
        });
      } catch (err) {
        try { fs.unlinkSync(tempFile); } catch {}
        return res.status(500).json({ error: 'Execution failed' });
      }
    } else if (language === 'python') {
      const tempFile = path.join(__dirname, `temp_${crypto.randomBytes(8).toString('hex')}.py`);
      
      try {
        fs.writeFileSync(tempFile, code, { mode: 0o600 });
        
        exec(`python "${tempFile}"`, { 
          timeout: EXECUTION_TIMEOUT,
          maxBuffer: MAX_OUTPUT_SIZE,
          env: {} 
        }, (error, stdout, stderr) => {
          try { fs.unlinkSync(tempFile); } catch {}
          
          if (error) {
            if (error.code === 'TIMEOUT') {
              return res.json({ output: '', stderr: 'Execution timeout', exitCode: 1 });
            }
            return res.json({ output: '', stderr: error.message.substring(0, 1000), exitCode: 1 });
          }
          
          res.json({ 
            output: stdout.substring(0, MAX_OUTPUT_SIZE), 
            stderr: stderr.substring(0, 1000), 
            exitCode: 0 
          });
        });
      } catch (err) {
        try { fs.unlinkSync(tempFile); } catch {}
        return res.status(500).json({ error: 'Execution failed' });
      }
    } else {
      res.status(400).json({ error: 'Unsupported language' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Execution failed', details: error.message });
  }
});

module.exports = router;
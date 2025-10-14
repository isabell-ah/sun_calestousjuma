// Test cases configuration matching database problems
const TEST_CASES = {
  // Database problems (from seed.js)
  'Hello World': {
    testCases: [
      { input: [], expected: 'Hello, World!' }
    ],
    functionName: 'solution'
  },
  'Two Sum': {
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] }
    ],
    functionName: 'twoSum'
  },
  'Palindrome Check': {
    testCases: [
      { input: ['racecar'], expected: true },
      { input: ['hello'], expected: false }
    ],
    functionName: 'isPalindrome'
  },
  'Find Maximum': {
    testCases: [
      { input: [[3,1,4,1,5,9,2,6]], expected: 9 }
    ],
    functionName: 'findMax'
  },
  'Count Vowels': {
    testCases: [
      { input: ['hello world'], expected: 3 }
    ],
    functionName: 'countVowels'
  },
  'Reverse String': {
    testCases: [
      { input: [['h','e','l','l','o']], expected: ['o','l','l','e','h'] }
    ],
    functionName: 'reverseString'
  },
  'Valid Parentheses': {
    testCases: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false }
    ],
    functionName: 'isValid'
  },
  // LeetCode fallback problems
  'lc-1': {
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] }
    ],
    functionName: 'twoSum'
  },
  'lc-9': {
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false }
    ],
    functionName: 'isPalindrome'
  }
};

class TestCaseService {
  // Get test cases for a specific problem
  getTestCases(problemId) {
    return TEST_CASES[problemId] || null;
  }

  // Add new test cases for a problem
  addTestCases(problemId, testConfig) {
    TEST_CASES[problemId] = testConfig;
  }

  // Get all available problem IDs with test cases
  getAvailableProblems() {
    return Object.keys(TEST_CASES);
  }

  // Validate test case structure
  validateTestCase(testCase) {
    return testCase && 
           Array.isArray(testCase.input) && 
           testCase.expected !== undefined;
  }
}

module.exports = new TestCaseService();
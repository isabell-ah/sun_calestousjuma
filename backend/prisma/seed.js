const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const problems = [
    {
      title: "Hello World",
      description: "Write a function that returns 'Hello, World!'",
      difficulty: "easy",
      category: "basics",
      testCases: JSON.stringify([{ input: {}, output: "Hello, World!" }]),
      hints: JSON.stringify(["Simply return the string 'Hello, World!'"])
    },
    {
      title: "FizzBuzz",
      description: "Write a program that prints numbers 1 to 100, but for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'.",
      difficulty: "easy",
      category: "basics",
      testCases: JSON.stringify([{ input: { n: 15 }, output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] }]),
      hints: JSON.stringify(["Use modulo operator to check divisibility"])
    },
    {
      title: "Palindrome Check",
      description: "Write a function to check if a given string is a palindrome (reads the same forwards and backwards).",
      difficulty: "easy",
      category: "strings",
      testCases: JSON.stringify([{ input: { s: "racecar" }, output: true }, { input: { s: "hello" }, output: false }]),
      hints: JSON.stringify(["Compare the string with its reverse"])
    },
    {
      title: "Find Maximum",
      description: "Write a function to find the maximum number in an array of integers.",
      difficulty: "easy",
      category: "arrays",
      testCases: JSON.stringify([{ input: { arr: [3, 1, 4, 1, 5, 9, 2, 6] }, output: 9 }]),
      hints: JSON.stringify(["Iterate through the array and keep track of the maximum value"])
    },
    {
      title: "Count Vowels",
      description: "Write a function that counts the number of vowels (a, e, i, o, u) in a given string.",
      difficulty: "easy",
      category: "strings",
      testCases: JSON.stringify([{ input: { s: "hello world" }, output: 3 }]),
      hints: JSON.stringify(["Use a loop and check each character"])
    },
    {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "easy",
      category: "arrays",
      testCases: JSON.stringify([
        { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
        { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] }
      ]),
      hints: JSON.stringify(["Use a hash map to store numbers and their indices"])
    },
    {
      title: "Reverse String",
      description: "Write a function that reverses a string.",
      difficulty: "easy", 
      category: "strings",
      testCases: JSON.stringify([
        { input: { s: ["h","e","l","l","o"] }, output: ["o","l","l","e","h"] }
      ]),
      hints: JSON.stringify(["Use two pointers approach"])
    },
    {
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      difficulty: "easy",
      category: "stacks",
      testCases: JSON.stringify([
        { input: { s: "()" }, output: true },
        { input: { s: "()[]{}" }, output: true }
      ]),
      hints: JSON.stringify(["Use a stack data structure"])
    },
    {
      title: "Add Two Numbers",
      description: "You are given two non-empty linked lists representing two non-negative integers.",
      difficulty: "medium",
      category: "linked-lists",
      testCases: JSON.stringify([
        { input: { l1: [2,4,3], l2: [5,6,4] }, output: [7,0,8] }
      ]),
      hints: JSON.stringify(["Handle carry-over between digits"])
    },
    {
      title: "Longest Substring",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      difficulty: "medium",
      category: "strings",
      testCases: JSON.stringify([
        { input: { s: "abcabcbb" }, output: 3 }
      ]),
      hints: JSON.stringify(["Use sliding window technique"])
    },
    {
      title: "3Sum",
      description: "Given an integer array nums, return all the triplets that sum to zero.",
      difficulty: "medium",
      category: "arrays",
      testCases: JSON.stringify([
        { input: { nums: [-1,0,1,2,-1,-4] }, output: [[-1,-1,2],[-1,0,1]] }
      ]),
      hints: JSON.stringify(["Sort array first, then use two pointers"])
    },
    {
      title: "Median of Two Sorted Arrays",
      description: "Given two sorted arrays nums1 and nums2, return the median.",
      difficulty: "hard",
      category: "arrays",
      testCases: JSON.stringify([
        { input: { nums1: [1,3], nums2: [2] }, output: 2.0 }
      ]),
      hints: JSON.stringify(["Use binary search approach"])
    },
    {
      title: "Regular Expression Matching",
      description: "Implement regular expression matching with support for '.' and '*'.",
      difficulty: "hard",
      category: "dynamic-programming",
      testCases: JSON.stringify([
        { input: { s: "aa", p: "a*" }, output: true }
      ]),
      hints: JSON.stringify(["Use dynamic programming"])
    },
    {
      title: "Binary Search",
      description: "Implement binary search algorithm to find target in sorted array.",
      difficulty: "easy",
      category: "algorithms",
      testCases: JSON.stringify([{ input: { nums: [1,2,3,4,5], target: 3 }, output: 2 }]),
      hints: JSON.stringify(["Use divide and conquer approach"])
    },
    {
      title: "Factorial",
      description: "Calculate factorial of a given number.",
      difficulty: "easy",
      category: "math",
      testCases: JSON.stringify([{ input: { n: 5 }, output: 120 }]),
      hints: JSON.stringify(["Use recursion or iteration"])
    },
    {
      title: "Fibonacci Sequence",
      description: "Generate the nth Fibonacci number.",
      difficulty: "easy",
      category: "math",
      testCases: JSON.stringify([{ input: { n: 7 }, output: 13 }]),
      hints: JSON.stringify(["Use dynamic programming for efficiency"])
    },
    {
      title: "Prime Numbers",
      description: "Check if a number is prime.",
      difficulty: "easy",
      category: "math",
      testCases: JSON.stringify([{ input: { n: 17 }, output: true }]),
      hints: JSON.stringify(["Check divisibility up to square root"])
    },
    {
      title: "Merge Sorted Arrays",
      description: "Merge two sorted arrays into one sorted array.",
      difficulty: "medium",
      category: "arrays",
      testCases: JSON.stringify([{ input: { nums1: [1,3,5], nums2: [2,4,6] }, output: [1,2,3,4,5,6] }]),
      hints: JSON.stringify(["Use two pointers technique"])
    },
    {
      title: "Binary Tree Traversal",
      description: "Implement inorder traversal of binary tree.",
      difficulty: "medium",
      category: "trees",
      testCases: JSON.stringify([{ input: { root: [1,null,2,3] }, output: [1,3,2] }]),
      hints: JSON.stringify(["Use recursion or stack"])
    },
    {
      title: "Quick Sort",
      description: "Implement quicksort algorithm.",
      difficulty: "medium",
      category: "algorithms",
      testCases: JSON.stringify([{ input: { arr: [3,1,4,1,5,9] }, output: [1,1,3,4,5,9] }]),
      hints: JSON.stringify(["Choose pivot and partition array"])
    },
    {
      title: "N-Queens Problem",
      description: "Solve the N-Queens puzzle using backtracking.",
      difficulty: "hard",
      category: "backtracking",
      testCases: JSON.stringify([{ input: { n: 4 }, output: 2 }]),
      hints: JSON.stringify(["Use backtracking with constraint checking"])
    }
  ];

  for (const problem of problems) {
    await prisma.problem.create({
      data: problem
    });
  }

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
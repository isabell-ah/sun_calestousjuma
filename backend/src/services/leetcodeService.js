const https = require('https');

class LeetCodeService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 60 * 60 * 1000; // 1 hour
  }

  async fetchProblems() {
    const cacheKey = 'leetcode_problems';
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      console.log('Returning cached LeetCode problems');
      return cached.data;
    }

    try {
      console.log('Fetching problems from LeetCode API...');

      //fetch from LeetCode API
      const response = await this.makeRequest('https://leetcode.com/api/problems/all/');

      if (response && response.stat_status_pairs) {
        const problems = response.stat_status_pairs
          .filter(item => item.stat && !item.paid_only)
          .slice(0, 50) 
          .map(item => ({
            id: `lc-${item.stat.question_id}`,
            title: item.stat.question__title,
            difficulty: this.mapDifficulty(item.difficulty.level),
            category: this.guessCategory(item.stat.question__title),
            description: `LeetCode Problem: ${item.stat.question__title}`,
            acceptanceRate: Math.round((item.stat.total_acs / item.stat.total_submitted) * 100) || 50,
            submissions: item.stat.total_submitted || 1000
          }));

        console.log(`Fetched ${problems.length} problems from LeetCode API`);
        this.cache.set(cacheKey, { data: problems, timestamp: Date.now() });
        return problems;
      }
    } catch (error) {
      console.warn('LeetCode API failed, using fallback problems:', error.message);
    }

    // Fallback to static problems
    console.log('Using fallback problems');
    const fallbackProblems = this.getFallbackProblems();
    this.cache.set(cacheKey, { data: fallbackProblems, timestamp: Date.now() });
    return fallbackProblems;
  }

  async getProblemsByDifficulty(difficulty, limit = 10) {
    try {
      const allProblems = await this.fetchProblems();
      const difficultyMap = { 'Easy': 'easy', 'Medium': 'medium', 'Hard': 'hard' };
      const targetDifficulty = difficultyMap[difficulty] || difficulty.toLowerCase();
      
      const filtered = allProblems.filter(problem => problem.difficulty === targetDifficulty);
      console.log(`getProblemsByDifficulty: ${difficulty} -> ${filtered.length} problems`);
      
      return filtered.slice(0, limit);
    } catch (error) {
      console.error('getProblemsByDifficulty error:', error);
      return [];
    }
  }

  makeRequest(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        timeout: 10000
      }, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });
      
      request.on('error', (error) => {
        reject(error);
      });
      
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  mapDifficulty(level) {
    switch(level) {
      case 1: return 'easy';
      case 2: return 'medium';
      case 3: return 'hard';
      default: return 'medium';
    }
  }

  guessCategory(title) {
    const titleLower = title.toLowerCase();

    if (titleLower.includes('array') || titleLower.includes('sum') || titleLower.includes('sort')) return 'arrays';
    if (titleLower.includes('string') || titleLower.includes('substring') || titleLower.includes('palindrome')) return 'strings';
    if (titleLower.includes('tree') || titleLower.includes('binary')) return 'trees';
    if (titleLower.includes('list') || titleLower.includes('linked')) return 'linked-lists';
    if (titleLower.includes('graph') || titleLower.includes('node')) return 'graphs';
    if (titleLower.includes('dynamic') || titleLower.includes('dp')) return 'dynamic-programming';
    if (titleLower.includes('stack') || titleLower.includes('queue') || titleLower.includes('parenthes')) return 'stacks';
    if (titleLower.includes('search') || titleLower.includes('binary')) return 'binary-search';
    if (titleLower.includes('math') || titleLower.includes('number')) return 'math';

    return 'algorithms';
  }

  getFallbackProblems() {
    // CJLF Resource Center - 22 curated problems for local learning
    return [
      // Easy problems (9)
      { id: 'lc-1', title: 'Two Sum', difficulty: 'easy', category: 'arrays', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', acceptanceRate: 49, submissions: 5000000 },
      { id: 'lc-9', title: 'Palindrome Number', difficulty: 'easy', category: 'math', description: 'Given an integer x, return true if x is palindrome integer.', acceptanceRate: 52, submissions: 3000000 },
      { id: 'lc-13', title: 'Roman to Integer', difficulty: 'easy', category: 'strings', description: 'Roman numerals are represented by seven different symbols.', acceptanceRate: 58, submissions: 2500000 },
      { id: 'lc-20', title: 'Valid Parentheses', difficulty: 'easy', category: 'stacks', description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.', acceptanceRate: 40, submissions: 3500000 },
      { id: 'lc-21', title: 'Merge Two Sorted Lists', difficulty: 'easy', category: 'linked-lists', description: 'You are given the heads of two sorted linked lists list1 and list2.', acceptanceRate: 62, submissions: 2800000 },
      { id: 'lc-26', title: 'Remove Duplicates from Sorted Array', difficulty: 'easy', category: 'arrays', description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place.', acceptanceRate: 51, submissions: 2200000 },
      { id: 'lc-27', title: 'Remove Element', difficulty: 'easy', category: 'arrays', description: 'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.', acceptanceRate: 54, submissions: 1800000 },
      { id: 'lc-35', title: 'Search Insert Position', difficulty: 'easy', category: 'binary-search', description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found.', acceptanceRate: 42, submissions: 2100000 },
      { id: 'lc-58', title: 'Length of Last Word', difficulty: 'easy', category: 'strings', description: 'Given a string s consisting of words and spaces, return the length of the last word in the string.', acceptanceRate: 38, submissions: 1500000 },
      
      // Medium problems (8)
      { id: 'lc-2', title: 'Add Two Numbers', difficulty: 'medium', category: 'linked-lists', description: 'You are given two non-empty linked lists representing two non-negative integers.', acceptanceRate: 38, submissions: 4200000 },
      { id: 'lc-3', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', category: 'strings', description: 'Given a string s, find the length of the longest substring without repeating characters.', acceptanceRate: 33, submissions: 4800000 },
      { id: 'lc-5', title: 'Longest Palindromic Substring', difficulty: 'medium', category: 'strings', description: 'Given a string s, return the longest palindromic substring in s.', acceptanceRate: 32, submissions: 3200000 },
      { id: 'lc-15', title: '3Sum', difficulty: 'medium', category: 'arrays', description: 'Given an integer array nums, return all the triplets that sum to zero.', acceptanceRate: 32, submissions: 3500000 },
      { id: 'lc-11', title: 'Container With Most Water', difficulty: 'medium', category: 'arrays', description: 'You are given an integer array height of length n.', acceptanceRate: 54, submissions: 2800000 },
      { id: 'lc-33', title: 'Search in Rotated Sorted Array', difficulty: 'medium', category: 'binary-search', description: 'There is an integer array nums sorted in ascending order (with distinct values).', acceptanceRate: 38, submissions: 2400000 },
      { id: 'lc-49', title: 'Group Anagrams', difficulty: 'medium', category: 'strings', description: 'Given an array of strings strs, group the anagrams together.', acceptanceRate: 66, submissions: 1900000 },
      { id: 'lc-56', title: 'Merge Intervals', difficulty: 'medium', category: 'arrays', description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.', acceptanceRate: 46, submissions: 2100000 },
      
      // Hard problems (5)
      { id: 'lc-4', title: 'Median of Two Sorted Arrays', difficulty: 'hard', category: 'binary-search', description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.', acceptanceRate: 36, submissions: 2100000 },
      { id: 'lc-10', title: 'Regular Expression Matching', difficulty: 'hard', category: 'dynamic-programming', description: 'Given an input string s and a pattern p, implement regular expression matching.', acceptanceRate: 27, submissions: 1200000 },
      { id: 'lc-23', title: 'Merge k Sorted Lists', difficulty: 'hard', category: 'linked-lists', description: 'You are given an array of k linked-lists lists.', acceptanceRate: 47, submissions: 1800000 },
      { id: 'lc-42', title: 'Trapping Rain Water', difficulty: 'hard', category: 'arrays', description: 'Given n non-negative integers representing an elevation map.', acceptanceRate: 58, submissions: 1400000 },
      { id: 'lc-25', title: 'Reverse Nodes in k-Group', difficulty: 'hard', category: 'linked-lists', description: 'Given the head of a linked list, reverse the nodes of the list k at a time.', acceptanceRate: 53, submissions: 800000 }
    ];
  }
}

module.exports = new LeetCodeService();
/**
 *给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，
 * 并返回他们的数组下标。（用map存key，值为下标）
 */
function f(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i]
    } else {
      map.set(target - nums[i], i)
    }
  }
}
// 给定数组，并且数组值范围在索引之内,找出重复数字，要求o(n)
function findDuplicates(nums) {
  let res = []
  for (let i = 0; i < nums.length; i++) {
    let num = Math.abs(nums[i])
    if (nums[num - 1] > 0) {
      nums[num - 1] *= -1
    } else {
      res.push(num)
    }
  }
  return res
}
// 合并两个有序数组
function merge(nums1, m, nums2, n) {
  let index1 = m - 1
  let index2 = n - 1
  let total = m + n - 1

  while (index2 >= 0) {
    if (nums1[index1] >= nums2[index2]) {
      nums1[total] = nums1[index1]
      index1--
      total--
    } else {
      nums1[total] = nums2[index2]
      index2--
      total--
    }
  }
}

// 斐波那契递归实现和dp实现

function fibornacci1(n) {
  if (n <= 2) {
    return n
  }
  return fibornacci1(n - 1) + fibornacci1(n - 2)
}

function fibornacci(n) {
  if (n <= 2) {
    return n
  }
  let [pre, cur] = [1, 1]
  for (let i = 3; i <= n; i++) {
    [pre, cur] = [cur, pre + cur]
  }
  return cur
}

// 动态规划
function count(N) {
  let coin = [64, 16, 4, 1]
  let rest = 1024 - N
  return coin.reduce((pre, cur) => {
    let a = Math.floor(rest / cur)
    rest = rest % cur
    return pre + a
  }, 0)
}

// 实现sum(1,2,3).sumof()  6
//sum(1)(2)(3).sumof()  6
// sum(1)(2,3)(1).sumof() 7
function sum() {
  let arg = [...arguments]
  let temp = function () {
    arg = [...arg, ...arguments]
    return temp
  }
  temp.sumof = function () {
    return arg.reduce((a, b) => {
      return a + b
    })
  }
  return temp
}

// 合并
const a = [
  [1, 2, 3],
  ['a', 'b', 'c'],
  ['m', 'n']
]

function f(matrix) {
  const result = []
  const len = matrix.length
  function dfs(res, curr) {
    if (res.length === len) {
      result.push(res.join(''))
      return
    }
    for (let i = 0; i < matrix[curr].length; i++) {
      res.push(matrix[curr][i])
      dfs(res, curr + 1)
      res.pop()
    }
  }
  dfs([], 0)
  return result
}

// 最长回文数
var longestPalindrome = function (s) {
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1)
  }
  let result = 0
  for (let value of map.values()) {
    result += Math.floor(value / 2) * 2
  }
  return result !== s.length ? result + 1 : result
}

// 最长公共前缀
var longestCommonPrefix = function (strs) {
  let res = ''
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== strs[0][i]) return res
    }
    res += strs[0][i]
  }
  return res
};


// 最大子序和
var maxSubArray = function (nums) {
  const dp = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = nums[i]
    if (dp[i - 1] > 0) {
      dp[i] += dp[i - 1]
    }
  }
  return Math.max(...dp)
}
// 最大连续数
var longestConsecutive = function (nums) {
  const len = nums.length
  if (len === 0) return 0
  nums.sort((a, b) => a - b)
  const dp = new Array(len).fill(1)
  for (let i = 1; i < len; i++) {
    if (nums[i - 1] + 1 == nums[i]) {
      dp[i] = dp[i - 1] + 1
    } else if (nums[i - 1] == nums[i]) {
      dp[i] = dp[i - 1]
    }
  }
  return Math.max(...dp)
}


//LRU缓存
var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    let value = this.map.get(key);
    this.map.delete(key); // 删除后，再 set ，相当于更新到 map 最后一位
    this.map.set(key, value);
    return value
  } else {
    return -1
  }
};

LRUCache.prototype.put = function (key, value) {
  // 如果已有，那就要更新，即要先删了再进行后面的 set
  if (this.map.has(key)) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  // put 后判断是否超载
  if (this.map.size > this.capacity) {
    this.map.delete(this.map.keys().next().value);
  }

};
// 只出现一次的数字，其他都是两次
var singleNumber = function (nums) {
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    res ^= nums[i]
  }
  return res
};
// 有效的括号
var isValid = function (s) {
  const stack = [],
    map = {
      "(": ")",
      "{": "}",
      "[": "]"
    };
  for (const x of s) {
    if (x in map) {
      stack.push(x);
      continue;
    };
    if (map[stack.pop()] !== x) return false;
  }
  return !stack.length;
};
// 字符串相乘
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  let len1 = num1.length, len2 = num2.length, res = new Array(len1 + len2).fill(0)
  // 结果最多为 m + n 位数
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      // 从个位数开始，逐步相乘
      const mul = num1[i] * num2[j]
      // 乘积在结果数组中对应的位置
      const p1 = i + j, p2 = i + j + 1
      // 对结果进行累加
      const sum = mul + res[p2]
      res[p1] += Math.floor(sum / 10)
      res[p2] = sum % 10
    }
  }
  if (res[0] === 0) res.shift()
  return res.join("")
};
// 10进制转化为16进制
var toHex = function (num) {
  const map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  if (num === 0)
    return "0";
  let ans = "";
  if (num < 0) {
    num = Math.pow(2, 32) - Math.abs(num);
  }
  while (num) {
    ans += map[num % 16];
    num = Math.floor(num / 16);
  }
  return ans.split("").reverse().join("");
};

// 重复子串
var repeatedSubstringPattern = function (s) {
  let len = Math.floor(s.length / 2)
  let strSub = ''
  for (let i = 1; i <= len; i++) {
    strSub = s.slice(0, i)
    if (strSub.repeat(Math.floor(s.length / strSub.length)) == s) {
      return true
    }
  }
  return false
};

// 数组的度
var findShortestSubArray = function (nums) {
  let map = {}
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      map[nums[i]][0]++
      map[nums[i]][2] = i
    } else {
      map[nums[i]] = [1, i, i]
    }
  }
  let maxCount = 0
  let maxLen = 0
  for (const [count, left, right] of Object.values(map)) {
    if (maxCount < count) {
      maxCount = count
      maxLen = right - left + 1
    } else if (maxCount == count) {
      if (maxLen > right - left + 1) {
        maxLen = right - left + 1
      }
    }
  }
  return maxLen
};

// 千位分隔符
var thousandSeparator = function (n) {
  const s = n + '';
  let res = [];
  for (let i = s.length - 1; i >= 0; i = i - 3) {
    res.push(s[i]);
    res.push(s[i - 1]);
    res.push(s[i - 2]);
    res.push('.');
  }
  res.pop();
  return res.reverse().join('');
};

// 分割平衡字符串
var balancedStringSplit = function (s) {
  let res = 0
  let charCount = 0
  for (let i = 0; i <= s.length; i++) {
    if (s[i] == 'L') {
      charCount++
    } else {
      charCount--
    }
    if (charCount == 0) {
      res++
    }
  }
  return res
};

// 无重复最长子串
var lengthOfLongestSubstring = function (s) {
  let count = 0
  let arr = []
  for (let str of s) {
    while (arr.includes(str)) {
      arr.shift()
    }
    arr.push(str)
    count = Math.max(count, arr.length)
  }
  return count
};
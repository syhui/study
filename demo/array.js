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
  let [pre, cur] = [1, 2]
  for (let i = 3; i < n; i++) {
    ;[pre, cur] = [cur, pre + cur]
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
// 函数柯里化
function createCurry(func, args) {
  var arity = func.length
  var args = args || []

  return function () {
    var _args = [].slice.call(arguments)
    ;[].push.apply(_args, args)

    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (_args.length < arity) {
      return createCurry.call(this, func, _args)
    }

    // 参数收集完毕，则执行func
    return func.apply(this, _args)
  }
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

function compose(nums) {
  let concact = (a, b) => {
    let arr = []
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        arr.push(`${a[i]}${b[j]}`)
      }
    }
    return arr
  }
  return nums.reduce((pre, cur) => {
    return concact(pre, cur)
  })
}

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

// 最大子序和
var maxSubArray = function (nums) {
  const dp = [nums[0]]
  for (let i = 1; i < nums.length; ++i) {
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

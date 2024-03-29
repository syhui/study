// 二分查找（索引）
function binarySearch(arr, target) {
  let max = arr.length - 1;
  let min = 0;
  while (min <= max) {
    let mid = Math.floor((max + min) / 2) + min;
    if (target > arr[mid]) {
      min = mid + 1
    } else if (target < arr[mid]) {
      max = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
// 冒泡排序
function bubleSort(arr) {
  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
// 插入排序
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i <= len - 1; i++) {
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
// 选择排序
function selectSort(arr) {
  let len = arr.length;
  for (let i = 0; i <= len - 1; i++) {
    for (let j = i; j <= len - 1; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let left = [];
  let right = [];
  let current = arr.splice(0, 1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= current) {
      right.push(arr[i])
    } else if (arr[i] < current) {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(current, quickSort(right))
}
// 归并排序
function merge(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)

  const sort = (left, right) => {
    const result = []
    while (left.length !== 0 && right.length !== 0) {
      if (left[0] <= right[0]) {
        const current = left.shift()
        result.push(current)
      } else {
        const current = right.shift()
        result.push(current)
      }
    }
    if (left.length > 0) {
      result.push(...left)
    }
    if (right.length > 0) {
      result.push(...right)
    }
    return result
  }

  return sort(merge(left), merge(right))
}





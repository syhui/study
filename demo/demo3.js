function reduce(fn, initValue) {
  let hasInit = initValue !== undefined
  let result = hasInit ? initValue : this[0]
  for (let i = hasInit ? 0 : 1; i < this.length; i++) {
    result = fn(result, this[i], this, i)
  }
  return result
}

function call(context) {
  if (typeof this !== 'function') {
    throw TypeError('not funtion')
  }
  context.fn = this
  let arg = [...arguments].slice(1)
  result = context.fn(arg)
  delete context.fn
  return result
}

function bind(context) {
  if (typeof this !== 'function') {
    throw TypeError('not funtion')
  }
  let arg = [...arguments]
  let that = this

  return function F() {
    return that.apply(this instanceof F ? this : context, arg.concat([...arguments]))
  }
}

function instance(left, right) {
  let L = left._proto_
  letR = right.prototype

  while (true) {
    if (L === null) {
      return false
    }
    if (L === R) {
      return true
    }
    L = L._proto_
  }

}

function myNew(fn) {

  let obj = Object.create(null)
  fn._proto_ = obj.prototype
  fn._proto_.construtor = fn
  let arg = [...arguments].slice(1)
  let result = fn.apply(obj, arg)

  return result
}

function deepClone(obj) {
  let copy = Array.isArray(obj) ? [] : {}
  for (k in obj) {
    if (obj.hasOwnproperty(k)) {
      copy[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
    }
  }
  return copy
}

function debounce(fn, delay) {
  let timer = null

  return function () {
    let that = this
    let arg = [...arguments]
    if (timer) {
      clearTimeout(timer)
      timer = null
    } else {
      timer = setTimeout(function () {
        fn.apply(that, arg)
      }, delay)
    }
  }
}
function throttle(fn, delay) {
  let timer = null

  return function () {
    let that = this
    let arg = [...arguments]
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(that, arg)
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}

class RequestLimit {
  constructor(limit) {
    this.limit = limit
    this.currentCount = 0
    this.taskList = []
  }
  excutor(fn) {
    return Promise((resolve, reject) => {
      let task = this.createTask(fn, resolve, reject)
      if (this.currentCount >= this.limit) {
        this.taskList.push(task)
      } else {
        task()
      }
    })
  }
  createTask(fn, resolve, reject) {
    return () => {
      fn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.currentCount--
          if (this.taskList.length > 0) {
            let task = this.taskList.shift()
            task()
          }

        })
      this.currentCount++
    }
  }
}

function search(arr, target) {
  let min = 0
  let max = arr.length
  while (max > min) {
    let mid = Math.floor(max + min) / 2
    if (arr[mid] > target) {
      max = mid - 1
    } else if (arr[mid] < target) {
      min = mid + 1
    } else {
      return arr[mid]
    }
  }
  return -1
}

function bubleSort(arr) {
  let len = arr.length
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

function quickSort(arr) {
  if(arr.length<=1){
    return arr
  }
  let left = []
  let right = []
  let mid = arr.slice(1)


  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= mid) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }

  return quickSort(left).concat(mid, quickSort(right))

}


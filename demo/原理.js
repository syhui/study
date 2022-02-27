Array.prototype.my_reduce = function (fn, initValue) {
  let hasInitValue = initValue !== undefined
  let result = initValue ? initValue : this[0]
  for (let i = hasInitValue ? 0 : 1; i < this.length; i++) {
    result = fn(result, this[i], i, this)
  }
  return result
}

Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
}

Function.prototype.myapply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments][1] instanceof Array ? [...arguments][1] : ''
  let result = context.fn(arg)
  delete context.fn
  return result
}
Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  const that = this
  const arg = [...arguments].slice(1)

  return function F() {
    return that.apply(this instanceof F ? this : context || this, arg.concat([...arguments]))
  }
}

function instanceOf(left, right) {
  let L = left.__proto__

  let R = right.prototype
  while (true) {
    if (L === null) {
      return false
    }
    if (L === R) {
      return true
    }

    L = L.__proto__
  }
}

function New(Fn) {
  let obj = {}
  let arg = Array.prototype.slice.call(arguments,1)
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  let ret = Fn.apply(obj, arg)
  return typeof ret === 'object' ? ret : obj
}

function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {}
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      copy[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
    }
  }
  return copy
}

class router {
  constructor() {
    this.route = this.route || new Map()
    this.currentUrl = ''
    this.freshRoute = this.freshRoute.bind(this)
    window.addEventListener('load', this.freshRoute)
    window.addEventListener('hashchange', this.freshRoute)
  }
  addRoute(path, cb) {
    if (!this.route.get(path)) {
      this.route.set(path, cb || function () {})
    }
  }
  freshRoute() {
    this.currentUrl = window.location.hash.slice(1) || ''
    this.route.get(this.currentUrl)()
  }
}
function xmlHttpRequest() {
  let xhr = new xmlHttpRequest()
  xhr.open('get', 'www.baidu.com', true)
  xhr.send({ data: '11' })
  xhr.onreadyStateChange = function () {
    if (xhr.readyStatus === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
}

function debounce(fn, delay) {
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, arg)
    }, delay)
  }
}
function debounceOn(fn, delay) {
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    if (timer) clearTimeout(timer)
    let now = !timer
    timer = setTimeout(() => {
      timer = null
    }, delay)
    if (now) fn.apply(context, arg)
  }
}
function throttleTime(fn, delay) {
  let pre = Date.now()
  return function () {
    let arg = arguments
    let now = Date.now()
    if (now - pre > delay) {
      fn.apply(context, arg)
      pre = Date.now()
    }
  }
}
function throttle(fn, delay) {
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, arg)
        clearTimeout(timer)
        timer = null
      })
    }
  }
}
// 动态规划
function count(N) {
  let Yb = [64, 16, 4, 1]
  let rest = 1024 - N
  return Yb.reduce((pre, cur) => {
    let a = Math.floor(rest / cur)
    rest = rest % cur
    return pre + a
  }, 0)
}

function jsonp(url, funName, success) {
  let script = document.createElement('script')
  script.src = url
  script.type = 'text/javascript'
  script.async = true
  window[funName] = function (data) {
    success && success(data)
  }
  document.appendChild(script)
}
// 并发限制
class RequestLimit {
  constructor(limit) {
    this.limit = limit
    this.currentCount = 0
    this.taskList = []
  }
  executer(fn) {
    return new Promise((resolve, reject) => {
      const task = this.createTask(fn, resolve, reject)
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

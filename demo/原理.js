Array.prototype.my_reduce = function (fn, initValue) {
  let hasInit = initValue !== undefined
  let result = initValue ? initValue : this[0]
  for (let i = hasInit ? 0 : 1; i < this.length; i++) {
    result = fn(result, this[i], i, this)
  }
  return result
}

Array.prototype._flat =function(){
  let res = []
  for(let item of this){
    Array.isArray(item)? res.push(...item._flat()) :res.push(item)
  }
  return res
}

Array.prototype._filter = function(fn) {
  if (typeof fn !== "function") {
      throw Error('参数必须是一个函数');
  }
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
      fn(this[i]) && res.push(this[i]);
  }
  return res;
}
Array.prototype._map = function(fn) {
  if (typeof fn !== "function") {
       throw Error('参数必须是一个函数');
   }
   const res = [];
   for (let i = 0, len = this.length; i < len; i++) {
       res.push(fn(this[i]));
   }
   return res;
}

Array.prototype._push = function() {
	for( let i = 0 ; i < arguments.length ; i++){
		this[this.length] = arguments[i] ;
	}
	return this.length;
}

Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context.fn = this
  let arg =  [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
}

Function.prototype.myapply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(arg)
  delete context.fn
  return result
}

Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  let arg = [...arguments].slice(1)
  let that = this
  return function F() {
    return that.apply(this instanceof F ? this : context, arg.concat([...arguments]))
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
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  let arg = [...arguments].slice(1)
  let result = Fn.apply(obj, arg)
  return typeof result === 'object' ? result : obj
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

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}// 浅拷贝的实现;

function deepClone(obj) {
  if (!object || typeof object !== "object") return;
  let copy = obj instanceof Array ? [] : {}
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      copy[k] =  obj[k] instanceof Object ? deepClone(obj[k]) : obj[k]
    }
  }
  return copy
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
    let that = this
    let arg = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(that, arg)
    }, delay)
  }
}
function debounceOn(fn, delay) {
  let timer = null
  return function () {
    let that = this
    let arg = [...arguments]
    if (timer) clearTimeout(timer)
    let now = !timer
    timer = setTimeout(() => {
      timer = null
    }, delay)
    if (now) fn.apply(that, arg)
  }
}
function throttleTime(fn, delay) {
  let pre = Date.now()
  return function () {
    let arg = [...arguments]
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
    let arg = [...arguments]
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, arg)
        clearTimeout(timer)
        timer = null
      })
    }
  }
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
  executor(fn) {
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

// 用settimeout模拟setInterval

function myInterval(fn,delay){
  let cb = function(){
    fn()
    setTimeout(cb,delay)
  }
  setTimeout(cb,delay)
}
// dateFormat
const dateFormat = (dateInput, format)=>{
  var day = dateInput.getDate()
  var month = dateInput.getMonth() + 1
  var year = dateInput.getFullYear()
  format = format.replace(/yyyy/, year)
  format = format.replace(/MM/,month)
  format = format.replace(/dd/,day)
  return format
}




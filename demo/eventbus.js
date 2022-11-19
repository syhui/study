class EventBus {
  constructor() {
    this.events = []
  }

  on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.on(event[i], fn)
      }
    } else {
      ;(this.events[event] || (this.events[event] = [])).push(fn)
    }
  }
  once(event, fn) {
    let that = this
    let handler = function () {
      that.off(event, handler)
      fn.apply(null, arguments)
    }
    handler.fn = fn
    this.on(event, handler)
  }
  off(event, fn) {
    // 不传参清空所有
    if (!arguments.length) {
      this.events = []
    }
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.off(event[i], fn)
      }
    }
    const cbs = this.events[event]
    if (!cbs) {
      return
    }
    // 不传第二个参数，清空当前事件所以cb
    if (arguments.length === 1) {
      this.events[event] = null
    }
    for (let i = 0; i < cbs.length; i++) {
      if (cbs[i] === fn || cbs[i].fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
  }
  emit(event) {
    // once删除会导致this.events内fn前移，复制为一个新数组
    let cbs = [...this.events[event]]
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        cbs[i].apply(null, [...arguments].slice(1))
      }
    }
  }
}

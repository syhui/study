class eventBus{
  constructor(){
    this.events = []
  }
  on(event,fn){
    if(Array.isArray(event)){
      for(let i =0; i<event.length;i++){
        this.on(event[i],fn)
      }
    }
    (this.events[event]||(this.events[event]=[])).push(fn)
  }
  once(event,fn){
    const that = this
    const handler = function(){
      that.off(event,fn)
      fn.apply(null,arguments)
    }
    handler.fn = fn
    this.on(event,handler)
  }
  off(event,fn){
    if(!arguments){
      this.events = []
    }
    if(Array.isArray(event)){
      for(let i =0; i<event.length;i++){
        this.off(event[i],fn)
      }
    }
    const cbs = this.events[event]
    if(!cbs){
      return
    }
    if(arguments.length===1){
      this.events[event] = []
    }
    for(let i =0; i<cbs.length;i++){
      if(cbs[i]==fn||cbs[i].fn==fn){
        cbs.splice(i,1)
        break
      }
    }
  }
  emit(event){
    const cbs = [...this.events[event]]
    for(let i =0; i<cbs.length;i++){
      cbs[i].apply(null,[...arguments].slice(1))
    }
  }
}
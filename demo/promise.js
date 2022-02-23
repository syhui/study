const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class MyPromise {
    /**
   * Promise 构造函数
   * @param {*} excutor 执行器方法（同步执行）
   */
    constructor(excutor) {
        this.status = PENDING; //给 promise 对象指定 status 属性，初始值为 pending
        this.data = undefined; // 给 promise 对象指定一个用于存储结果的属性 
        this.callbacks = []; // 每个元素的结构为 {onResolved(){}, onRejected(){}}

        const resolve = value => {
            // 如果当前状态不是 pending，直接结束
            if (this.status !== PENDING) {
                return;
            }
            // 将状态改为 resolved
            this.status = RESOLVED;

            // 保存 value 数据
            this.data = value;

            // 如果有待执行的 callback 函数，异步执行回调 onResolved （用setTimeout执行异步）
            if (this.callbacks.length > 0) {
                this.callbacks.forEach(callbacksObj => { //放到队列中执行所有成功的回调
                    setTimeout(() => {
                        callbacksObj.onResolved(value);
                    });
                });
            }

        };

        const reject = reason => {
            // 如果当前状态不是 pending，直接结束
            if (this.status !== PENDING) {
                return;
            }

            // 将状态改为 rejected
            this.status = REJECTED;

            //保存 reason 数据
            this.data = reason;

            //如果有待执行的 callback 函数，异步执行回调函数 onRejected（用setTimeout执行异步）
            if (this.callbacks.length > 0) {
                this.callbacks.forEach(callbacksObj => {
                    setTimeout(() => {
                        callbacksObj.onRejected(reason);
                    });
                });
            }
        };

        //立即同步执行 excutor，如果执行器函数抛出异常，promise 对象变为 rejected 状态 （直接调用reject方法即可）
        try {
            excutor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    /**
     * Promise 原型对象的 then()
     * @param {*} onResolved 指定成功的回调函数
     * @param {*} onRejected 指定失败的回调函数 
     * @return 返回一个新的 Promise 对象,返回的 Promise 的结由 onResolved/onRejected 的执行结果决定
     */
    then(onResolved, onRejected) {
        onResolved = typeof onResolved === 'function' ? onResolved : value => value;

        // 指定默认的失败回调（实现错误/异常传透）
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        return new MyPromise((resolve, reject) => {

            /**
             * 调用指定的回调函数处理，根据执行结果，改变 return 的 promise 状态
             * 
             * 1. 如果回调函数抛出异常，return 的 promise 就会失败，reason 就是 error
             * 2. 如果回调函数返回的不是 promise，return 的 promise 就会成功，value 就是返回的值
             * 3. 如果回调函数返回的是一个 promise，return 的 promise 的结果就是这个 promise 的结果
             * 
             * @param {*} callback 
             */
            const hander = (callback) => {
                try {
                    const result = callback(this.data);
                    if (result instanceof MyPromise) { // 3. 
                        result.then(resolve, reject); // 2.
                    } else {
                        resolve(result);
                    }
                } catch (error) { //1.
                    reject(error);
                }
            };

            switch (this.status) {
                case PENDING: // 如果当前是 pending 状态，将回调函数保存起来，等 status 改变后在执行
                    this.callbacks.push(
                        {
                            onResolved: value => hander(onResolved),
                            onRejected: reason => hander(onRejected)
                        });
                    break;
                case RESOLVED: // 如果当前是 resolved 状态，异步执行 onResolved，并改变 return 的 promise 状态
                    setTimeout(() => {
                        hander(onResolved);
                    });
                    break;
                case REJECTED: // 如果当前是 rejected 状态，异步执行 onRejected，并改变 return 的 promise 状态
                    setTimeout(() => {
                        hander(onRejected);
                    });
                    break;
                default:
                    break;
            }
        });
    };

    /**
     * Promise 原型对象的 catch()
     * @param {*} onRejected 指定失败的回调函数
     * @return  返回一个新的 Promise 对象
     */
    catch(onRejected) {
        return this.then(undefined, onRejected);
    };

    /**
     * Promsie 函数对象方法(静态方法)
     * @param {*} value 
     * @return 返回一个指定结果的成功的 Promise 对象
     */
    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    };

    /**
     * Promise 函数对象方法（静态方法）
     * @param {*} reason  失败的原因
     * @return 返回一个指定 reason 的失败的 Promise 对象
     */
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    };


    /**
     * Promise 函数对象的 all 方法（静态方法）
     * @param {*} myPromises 
     * @return 返回一个 promise 只有当所有的 promise 都成功时才成功，否则只要有一个失败则失败
     */
    static all(myPromises) {
        //用来保存所有成功 value 的数组
        const values = Array(myPromises.length);

        //用来保存成功 promise 的数量
        let resolvedCount = 0;
        return new MyPromise((resolve, reject) => {
            // 遍历获取每个Promise的结果
            myPromises.forEach((p, index) => {
                //p成功，将成功的 value 保存到 values 中 
                //MyPromise.resolve(p) 说明：myPromises中的的元素有可能不是一个Promise对象，
                //用 MyPromise.resolve 将其包装成一个promise对象
                MyPromise.resolve(p).then(value => {
                    resolvedCount++;
                    values[index] = value;

                    //如果全部成功了，将 return 的 promise 改为成功
                    if (resolvedCount === myPromises.length) {
                        resolve(values);
                    }
                }, reason => { //只要有一个失败了，return 的 promise 就失败
                    reject(reason);
                });
            });
        });

    };
    static allSettled(myPromises) {
        //用来保存所有成功 value 的数组
        const resultList = Array(myPromises.length)

        //用来保存成功 promise 的数量
        let resolvedCount = 0
        return new MyPromise((resolve, reject) => {
            // 遍历获取每个Promise的结果
            myPromises.forEach((p, index) => {
                //p成功，将成功的 value 保存到 values 中
                //MyPromise.resolve(p) 说明：myPromises中的的元素有可能不是一个Promise对象，
                //用 MyPromise.resolve 将其包装成一个promise对象
                MyPromise.resolve(p).then(
                    (value) => {
                        resolvedCount++
                        resultList[index] = { status: 'fulfilled', value: value }
                        if (resolvedCount === myPromises.length) {
                            resolve(resultList)
                        }
                    },
                    (reason) => {
                        resolvedCount++
                        resultList[index] = { status: 'rejected', value: reason }
                        if (resolvedCount === myPromises.length) {
                            reject(resultList)
                        }
                    }
                )
            })
        })
    }
    /**
     * Promise 函数对象 race 方法 （类里面静态方法）
     * @param {*} myPromises 
     * @return 返回一个 promise，其结果由第一个完成的 promise 的结果决定
     */
    static race(myPromises) {
        return new MyPromise((resolve, reject) => {
            //返回第一个执行完成的 promise 的结果
            myPromises.forEach((p) => {
                //MyPromise.resolve(p) 说明：myPromises中的的元素有可能不是一个Promise对象，
                //用 MyPromise.resolve 将其包装成一个promise对象
                MyPromise.resolve(p).then(value => {
                    resolve(value);
                }, reason => {
                    reject(reason);
                });
            });
        });
    };
}
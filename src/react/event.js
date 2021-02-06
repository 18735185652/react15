
/**
 * 在react我们并不是把事件绑定在DOM节点上，而绑定在document 类似于事件委托
 * 1. 因为合成事件可以屏蔽浏览器的差异 ，不同浏览器绑定事件和触发事件的方法不一样
 * 2.合成可以实现事件对象复用，重用 减少垃圾回收，提高性能
 * 3. 因为默认我要实现批量更新 setState setState 两个setState合成一次更新，这个也是在合成事件中处理
 * @param {*} dom 要绑定事件的DOM节点
 * @param {*} eventType 事件类型 onClick onChange
 * @param {*} listener 事件处理函数
 */
export function addEvent(dom, eventType, listener) {
    eventType = eventType.toLowerCase() // onClick => onclick
    // 在要绑定的DOM节点上挂载一个对象，准备存放监听函数
    let eventStore = dom.eventStore || (dom.eventStore = {});
    eventStore[eventType] = listener; // eventStore.onclick=()=>{alert('hello')}
    document.addEventListener(eventType.slice(2), dispatchEvent, false); // false 冒泡阶段处理

}

let syntheticEvent;
// 真正事件触发的统一是这个 dispatchEvent 方法
// event就是原生DOM事件对象，但是传递给我们的监听函数的并不是他
function dispatchEvent(event) {
    let {type,target} = event;
    let eventType = `on` + type; // onclick
    // 在此处给syntheticEvent赋值
    syntheticEvent = getSyntheticEvent(event);
    console.log('nativeEvent: ', syntheticEvent);
    //模拟事件冒泡
    while(target){
        let {eventStore} = target;
        let listener = eventStore && eventStore[eventType]; // onclick
        if(listener){
            listener.call(target,syntheticEvent)
        }
        target = target.parentNode;

    }
    // 等所有的监听函数都执行完了 就可以清掉所有的属性了，供下次复用此syntheticEvent对象 
    for (let key in syntheticEvent){
        // if(key !== 'persist'){
        //     syntheticEvent[key] = null; // 清空syntheticEvent对象
        // }
        console.log('key: ', key);
        if(syntheticEvent.hasOwnProperty(key)){
           
            syntheticEvent[key] = null;
        }
    }
}

// document.addEventListener('click',dispatchEvent,false)
// 第一阶段是捕获 第二阶段是冒泡 false是冒泡

// 如果执行了persist，就让syntheticEvent指向了新的对象，while循环结束之后在清除的是新对象的属性
function persist(){
    syntheticEvent = {}
    syntheticEvent.__proto__.persist = persist
}
function getSyntheticEvent(nativeEvent){
     // 第一次才会创建 以后就不再创建，始终会用同一个
    if(!syntheticEvent){
        syntheticEvent = {persist};
    }
    syntheticEvent.nativeEvent = nativeEvent;
    getSyntheticEvent.currentTarget = nativeEvent.target;

    // 把原生事件对象上的方法和属性都拷贝到了合成事件对象上
    for(let key in nativeEvent){
        if(typeof nativeEvent[key] === 'function'){
            syntheticEvent[key] = nativeEvent[key].bind(nativeEvent)
        }else {
            syntheticEvent[key] = nativeEvent[key]
        }
    }
    return syntheticEvent;
}
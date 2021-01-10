
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
    eventStore[eventType] = listener;
    document.addEventListener(eventType.slice(2), dispatchEvent, false); // false 冒泡阶段处理

}

// 真正事件触发的统一是这个 dispatchEvent 方法
// event就是原生DOM事件对象，但是传递给我们的监听函数的并不是他
function dispatchEvent(event) {
    console.log(111);
}
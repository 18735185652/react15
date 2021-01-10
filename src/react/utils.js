
import { addEvent } from './event'
// 如果obj是数组 只取第一个元素，如果不是数组 就返回自己
export function onlyOne(obj) {
    return Array.isArray(obj) ? obj[0] : obj
}

// 给真实dom节点赋属性
export function setProps(dom, props) {
    for (let key in props) {
        if (key !== 'children') {
            let value = props[key];
            setProp(dom, key, value)
        }
    }

}

function setProp(dom, key, value) {
    if (/^on/.test(key)) {
        addEvent(dom, key, value) // key => onClick   value = ()=>{}
        // dom[key.toLowerCase()] = value
    } else if (key === 'style') {
        for (let styleName in value) { // {color:red}
            dom.style[styleName] = value[styleName];
        }
    } else {
        dom.setAttribute(key, value)
    }

}
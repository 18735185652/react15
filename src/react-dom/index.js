import { createDom } from '../react/vdom'

function render(element, container) {
    // 1.要把虚拟DOM变成真实DOM
    let dom = createDom(element)
    //2. 直接把DOM挂载到container上
    container.appendChild(dom)
}


export default {
    render
}
import { TEXT, ELEMENT } from './constants';
import { onlyOne, setProps } from './utils';

export function ReactElement($$typeof, type, key, ref, props) {
    let element = {
        $$typeof, type, key, ref, props
    }
    return element
}

export function createDom(element) {
    element = onlyOne(element); // children是一个数组，取出第一个
    let { $$typeof } = element;
    let dom = null;
    if (!$$typeof) { // element是一个字符串或者数字
        dom = document.createTextNode(element)
    } else if ($$typeof === TEXT) { // 对象{$$typeof:TEXT}
        dom = document.createTextNode(element.content)
    } else if ($$typeof === ELEMENT) {
        dom = createNativeDom(element)
    }
    return dom
}

// 创建原生dom
function createNativeDom(element) {
    let { type, props } = element;
    let dom = document.createElement(type);
    // 1.创建此虚拟dom节点的子节点
    createNativeDomChildren(dom, element.props.children)
    // 2. 给dom添加属性
    setProps(dom, props)
    return dom;
}

function createNativeDomChildren(parentNode, children) {
    children && children.flat(Infinity).map(child => {
        let childDom = createDom(child)
        parentNode.appendChild(childDom)
    })


}
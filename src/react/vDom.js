import { TEXT, ELEMENT,CLASS_COMPONENT,FUNCTION_COMPONENT } from './constants';
import { onlyOne, setProps,flatten } from './utils';

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
    }else if ($$typeof ===  FUNCTION_COMPONENT) { // 函数组件
        dom = createFunctionComponentDOM(element)    
    }else if ($$typeof ===  CLASS_COMPONENT) {
        dom = createClassComponentDOM(element)    
    }
    return dom
}

// 创建原生dom
function createNativeDom(element) {
    let { type, props } = element;
    let dom = document.createElement(type);
    // 1.创建此虚拟dom节点的子节点
    createDomChildren(dom, element.props.children)
    // 2. 给dom添加属性
    setProps(dom, props)
    return dom;
}

function createDomChildren(parentNode, children) {
    children && flatten(children).map((child,index) => {
        // child其实是虚拟dom，虚拟dom上加一个_mountIndex属性，指向此虚拟DOM节点在父亲节点中的索引
        // 在后面我们做dom-diff的时候会变得非常非常重要
        child._mountIndex = index;
        let childDom = createDom(child);

        parentNode.appendChild(childDom)
    })
}

// 创建函数组件对应的真实dom对象
function createFunctionComponentDOM(element){
    let { type, props } = element; // type = FunctionCounter
    let renderElement = type(props);
    element.renderElement = renderElement; // 需要缓存，方便下次对比
    let newDom = createDom(renderElement);
    // 虚拟DOM的dom属性指向它创建出来的真实DOM
    renderElement.dom = newDom; // 我们从虚拟DOM react元素创建出真实dom，创建出来后会把真实的dom添加到虚拟dom的dom属性上
    return newDom
    // element.renderElement.dom = 真实DOM
}

function createClassComponentDOM(element){
   
    let { type, props } = element;
    let componentInstance = new type(props);
    // 当创建类组件实例后，会在类组件的虚拟DOM对象上添加一个属性componentInstance，指向类组件的实例
    element.componentInstance = componentInstance;
    let renderElement = componentInstance.render();
    // 在类组件实例上添加renderElement，指向上一次要渲染的虚拟DOM节点
    // 在后面组件更新的时候，我们会重新render。然后根上一次的renderElement进行 dom diff 对比
    componentInstance.renderElement = renderElement;
    let newDom = createDom(renderElement);
    renderElement.dom = newDom; 
    console.log('element: ', element);
    return newDom
    // element.componentInstance.renderElement.dom = 真实的dom元素
}
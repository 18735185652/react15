import { TEXT, ELEMENT,CLASS_COMPONENT,FUNCTION_COMPONENT } from './constants';
import { ReactElement } from './vdom';
import {Component} from './component'

// let element = React.createElement('button',{id:'sayHello',className:'btn',onClick},
//   'say',React.createElement('span',{style:{color:'red',fontSize:'30px'}},'Hello')
// )
function createElement(type, config = {}, ...children) {
    
    delete config._source;
    delete config._self;
    console.log('config: ', config);

    let { key, ref, ...props } = config;
    let $$typeof = null;
    if (typeof type === 'string' || typeof type === 'number') { // span div
        $$typeof = ELEMENT; // 是一个原声的DOM类型       
    }else if(typeof type === 'function' && type.prototype.isReactComponent){
        $$typeof = CLASS_COMPONENT;
    }else if(typeof type === 'function'){
        $$typeof = FUNCTION_COMPONENT;
       
    }
    props.children = children.map(item => {
        if (typeof item === 'object') {
            return item //React.createElement('span',{color:'red'},'Hello')
        } else {
            return {
                $$typeof: TEXT, type: TEXT, content: item  // item = say Hello
            }
        }
    })
    console.log('typeof: ', $$typeof);
    return ReactElement($$typeof, type, key, ref, props);
}


const React = {
    createElement,
    Component
}
export {
    Component
}

export default React;
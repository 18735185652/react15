import { TEXT, ELEMENT } from './constants';
import { ReactElement } from './vdom';

function createElement(type, config = {}, ...children) {
    console.log('config: ', config);
    delete config._source;
    delete config._self;

    let { key, ref, ...props } = config;
    let $$typeof = null;
    if (typeof type === 'string') { // span div
        $$typeof = ELEMENT; // 是一个原声的DOM类型       
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
    return ReactElement($$typeof, type, key, ref, props);
}

const React = {
    createElement,
}

export default React;
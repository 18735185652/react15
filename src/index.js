import React from './react';
import ReactDOM from './react-dom';

let onClick = ()=>{
  console.log('sayHello');
}
let element = React.createElement('button',{id:'sayHello',className:'btn',onClick},
  'say',React.createElement('span',{style:{color:'red',fontSize:'30px'}},'Hello')
)
console.log('element: ', element);

// let element2 = (
//   <button id='sayHello'>say
//     <span color='red'> Hello</span> 
//   </button>
// )


ReactDOM.render(
  element,
  document.getElementById('root')
);


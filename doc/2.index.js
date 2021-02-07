import React from './react';
import ReactDOM from './react-dom';

let onClick = (syntheticEvent)=>{
  console.log('sayHello',syntheticEvent);
  // 一旦调用persist意味着要持久化，浏览器不会回收此对象，容易造成内存泄露 需要我们手动回收
  syntheticEvent.persist();
  // setInterval(()=>{
  //   console.log('sayHello',syntheticEvent);
  // },1000)

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

class ClassComponent extends React.Component {
  constructor(props){
    super(props); // this.props = props
  }
  render (){
    return (
      React.createElement('div',{id:'counter'},'ClassComponent')
    )
  }
}
function FunctionCounter(){
   return  React.createElement('div',{id:'counter'},'FunctionCounter')
}

let element1 = React.createElement('div',{id:'counter'},'hello');
let element2 = React.createElement(ClassComponent);
let element3 = React.createElement(FunctionCounter);

ReactDOM.render(
  element2,
  document.getElementById('root')
);


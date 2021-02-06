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

// class Counter extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       number:0
//     }
//   }
//   tick = (event) =>{
//     setInterval(()=>{
//        console.log('tick: ', event);
//     },1000)
//   }
//   onClick = (event) =>{
//     console.log('event: ', event);
//     this.tick(event)
//   }
//   render (){
//     return (
//       <div>
//         <p>{this.state.number}</p>
//         <button onClick={this.onClick}>+</button>
//       </div>
//     )
//   }
// }

ReactDOM.render(
  element,
  document.getElementById('root')
);


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

let element4 = (
  <button id='sayHello'>say
    <span color='red'> Hello</span> 
  </button>
)

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

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {number:0}
  }
  handleClick = () =>{
    this.setState({number:this.state.number+1});
    console.log('this.state.number: ', this.state.number);
    this.setState({number:this.state.number+1});
    console.log('this.state.number: ', this.state.number);
    // setTimeout(()=>{
    //   this.setState({number:this.state.number+1});
    //   console.log('this.state.number: ', this.state.number);
    //   this.setState({number:this.state.number+1});
    //   console.log('this.state.number: ', this.state.number);
    // })
    
  }
  render(){
    return (
      React.createElement('div',{id:this.state.number,onClick:this.handleClick},'+')
    )
  }
}
let element1 = React.createElement('div',{id:'counter'},'hello');
let element2 = React.createElement(ClassComponent);
let element3 = React.createElement(FunctionCounter);
let element5 = React.createElement(Counter);


ReactDOM.render(
  element5,
  document.getElementById('root')
);


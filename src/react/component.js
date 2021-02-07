import {isFunction} from './utils'

//更新队列
export let updateQueue = {
    updaters:[], // 这里放着将要执行的更新器对象
    isPending:false, // 是否批量更新 如果isPending = true，则处于批量更新模式
    add(updater){ // 放进去之后就完事了，不进行真正的更新，什么时候真正更新
        this.updaters.push(updater)
    },
    // 需要有人调用batchUpdate 方法才会真正更新
    batchUpdate(){ // 强行全部更新 执行真正的更新
        let {updaters} = this;
        this.isPending = true; // 进入批量更新
        let updater;
        while(updater = updaters.pop()){
            updater.updateComponent() // 更新所有的dirty组件
        }
        this.isPending = false; // 改为非批量更新
    }
}

class Updater{
    constructor(componentInstance){
        this.componentInstance = componentInstance; // 一个Updater和一个类组件实例是一对一的关系
        this.peddingStates = []; // 更新有可能是批量的，如果是处于批量更新的话，需要把分状态都先暂存到数组里，最后在更新的时候统一合并
        this.nextProps = null; // 新的属性对象 
    }
    addState(partialState){
        this.peddingStates.push(partialState);
        this.emitUpdate(); // 开始视图更新
    }
    emitUpdate(nextProps){ // 可能会传一个新的属性对象过来
        this.nextProps = nextProps;
        // 如果传递了新的属性对象，或者当前是处于非批量更新模式的话就直接更新
        // 如果有新的属性对象或者要立刻更新的话
        if(nextProps || !updateQueue.isPending){
            this.updateComponent();
        }else {
            //如果当前是批量更新的模式，则把自己这个updater实例放到updateQueue
            updateQueue.add(this);
        }
    }
    updateComponent(){
        let {componentInstance,peddingStates,nextProps} = this;
        if(nextProps || peddingStates.length>0){ // 长度>0说明有等待合并的更新状态
            shouldUpdate(componentInstance,nextProps,this.getState());
        }
    }
    getState(){
        let {componentInstance,peddingStates,} = this;
        let {state} = componentInstance;
        if(peddingStates.length> 0){
            peddingStates.forEach(nextState=>{
                if(isFunction(nextState)){
                    state = nextState.call(componentInstance,state);
                }else {
                    state = {...state,...nextState}
                }
            })
        }
        peddingStates.length = 0; // 用完之后清除
        return state; 
    }
  

}
// 判断是否要更新
function shouldUpdate(componentInstance,nextProps,newState){
    componentInstance.props = nextProps;
    componentInstance.state = newState;
    if(componentInstance.shouldComponentUpdate && !componentInstance.shouldComponentUpdate(nextProps,newState)){
        return false; //不更新
    }
    componentInstance.forceUpdate(); // 当组件强行刷新
}

class Component {
    constructor(props){
        this.props = props;
        this.$update = new Updater(this);
        this.state = {}; // 当前状态
        this.nextProps = null; //下一个属性对象
    }
    // 批量更新 partial部分 因为状态可能会被合并
    setState(partialState){
        this.$update.addState(partialState)
    }
    // 进行组件更新
    forceUpdate(){ 
        console.log('forceUpdate: ');
       
    }
}

// 类组件和函数组件编译之后都是函数 ，通过此属性区分函数组件还是类组件
Component.prototype.isReactComponent = {};

export {
    Component 
} 
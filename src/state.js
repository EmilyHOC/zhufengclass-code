import {observe} from './observer/index'
export function initState(vm) {
    const opts = vm.$options
    console.log(opts)
    //vue的数据来源 属性 方法 数据 计算属性 watch
    if(opts.props){
        initProps(vm)
    }
    if(opts.methods){
        initMethod(vm)
    }
    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed(vm)
    }
    if(opts.watch){
        initWatch(vm)
    }
}
function initData(vm) {
    console.log('初始化数据',vm.$options.data)
    let data = vm.$options.data
    data =vm._data= typeof data === 'function'?data.call(vm): data;
    console.log(data)
    //对象劫持 用户改变了数据 我希望得到通知，刷新页面
    //MVVM模式 数据变化可以驱动视图
    //Object.defineProperty()给属性添加get方法和set方法
    observe(data) //响应式原理
}
 function initProps(){

 }
function initMethod(){

}
function initComputed(){

}
function initWatch(){

}

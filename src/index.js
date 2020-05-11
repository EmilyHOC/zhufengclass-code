import {initMixin} from "./init";

//Vue的核心代码
function Vue(options) {
    //进行Vue文件的初始化操作
    this._init(options)
}
initMixin(Vue)  //通过引入文件的方式
//通过引入文件的方式，给Vue原型上添加方法
export default Vue
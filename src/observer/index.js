//把data中的数据都使用Object.definedProperty重新定义，不能兼容IE8
import {isObject2} from '../util/index'

class  Observer{
    constructor(value) {
        console.log(value)
        //vue如果数据的层次过多，需要递归地解析对象中的属性，依次增加set和get方法，proxy
        this.walk(value)
    }
    //观测数据
    walk(data){
        //拿到所有的key值
        let keys = Object.keys(data)
        console.log(keys)
        keys.forEach((key,index)=> {
            defineReactive(data,key,data[key])
        })
        for(let i = 0;i<keys.length;i++){
            let key = keys[i]
            let value = data[key]

            //响应式的核心
            defineReactive(data,key,value) //定义响应式的核心
        }
    }
}
function defineReactive(data,key,value) {
    console.log(data)
    observe(value) //递归实现深度检测
    Object.defineProperty(data,key,{
        get() {
            return value;
        },
        set(newValue) {
            if(newValue=== value) return;
            observe(newValue)  //继续劫持用户设置的值，有可能用户设置的值是对象
            console.log('值变化')
            value = newValue
        }
    })
}
export function observe(data) {
    //看看他是不是对象，不是的话return 是的话就观测对象
    let isObject =  isObject2(data)
    if(!isObject){
        return
    }
    new Observer(data)

}
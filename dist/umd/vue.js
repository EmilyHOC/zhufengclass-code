(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isObject2(data) {
    return _typeof(data) == 'object' && data !== null;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      console.log(value); //vue如果数据的层次过多，需要递归地解析对象中的属性，依次增加set和get方法，proxy

      this.walk(value);
    } //观测数据


    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        //拿到所有的key值
        var keys = Object.keys(data);
        console.log(keys);
        keys.forEach(function (key, index) {
          defineReactive(data, key, data[key]);
        });

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = data[key]; //响应式的核心

          defineReactive(data, key, value); //定义响应式的核心
        }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    console.log(data);
    observe(value); //递归实现深度检测

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue); //继续劫持用户设置的值，有可能用户设置的值是对象

        console.log('值变化');
        value = newValue;
      }
    });
  }

  function observe(data) {
    //看看他是不是对象，不是的话return 是的话就观测对象
    var isObject = isObject2(data);

    if (!isObject) {
      return;
    }

    new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;
    console.log(opts); //vue的数据来源 属性 方法 数据 计算属性 watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    console.log('初始化数据', vm.$options.data);
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    console.log(data); //对象劫持 用户改变了数据 我希望得到通知，刷新页面
    //MVVM模式 数据变化可以驱动视图
    //Object.defineProperty()给属性添加get方法和set方法

    observe(data); //响应式原理
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      console.log(options); //数据的劫持

      var vm = this; //vue中使用this.$options指代的是用户传递的属性

      vm.$options = options;
      console.log(vm); //初始化状态

      initState(vm); //分割代码
    };
  }

  function Vue(options) {
    //进行Vue文件的初始化操作
    this._init(options);
  }

  initMixin(Vue); //通过引入文件的方式

  return Vue;

})));
//# sourceMappingURL=vue.js.map

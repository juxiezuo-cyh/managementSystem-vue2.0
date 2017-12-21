require("assets/css/common.css");
//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大，估计是vux OR vue 抽风了
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{ size: 'small' })
import M from "./common";
import Api from './api';
//解决click点击300毫秒延时问题
import FastClick from "fastclick";
FastClick.attach(document.body);

export default {
  M,
  Api
};

import Vue from 'vue'
import App from './App.vue'
import router from './router'   //引入vue-router模块
//引入elementui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;


// Vue.use(echarts);
// 1. 创建一个全局bus, 用来跨级传值
Vue.prototype.$bus = new Vue();

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router, //当把路由对象注入后, 此项目就会开始监听你写的hash值!!!!
  render: h => h(App),
}).$mount('#app')

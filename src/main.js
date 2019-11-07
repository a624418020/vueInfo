import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import VConsole from 'vconsole'
import setRem from './libs/rem.js';
import 'vant/lib/index.css';
import loading from './components/loding/loading'
import './libs/debounce' //点击事件的防抖和节流 v-debounce="[() => { submit() }, 500]"
// import monitor from './libs/monitor'
// import Bridge from './libs/bridge.js'

setRem();//配置rem 后面宽度使用px自动转换rem,屏宽750；
Vue.use(Vant);//UI框架组建因为懒所以全部引用
Vue.use(loading);//自定义的加载中loading

new VConsole();
// if (window.location.host === 'wx.turboradio.cn') {
//     new VConsole();
// }

/**
let handler = monitor.bind(function (e) { //数据上报组件
    e = e || window.event;
    monitor._trackEvent(e, 'aaa');
}, this);
document.addEventListener('click', handler, true);

Vue.prototype.$bridge = Bridge;//与IOS和安卓数据交互组建,
/https://www.npmjs.com/package/qrcode.vue二维码控件

Vue.config.productionTip = false;
 */


//动态修改页面title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

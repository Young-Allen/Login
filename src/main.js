import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'vant/lib/index.css';
// 方式1: 全局 - 自动按需引入vant组件
// (1): 下载 babel-plugin-import
// (2): babel.config.js - 添加官网说的配置 (一定要重启服务器)
// (3): main.js 按需引入某个组件, Vue.use全局注册 - 某个.vue文件中直接使用vant组件
import { Button } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Icon } from 'vant';

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Icon);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
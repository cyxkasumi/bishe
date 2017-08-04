/**
 * Created by zhu on 2016/10/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routers';
import App from './App.vue';
import VueResource from 'vue-resource';

Vue.use(VueRouter); //装载插件
Vue.use(VueResource); //转载插件

Vue.config.silent = false;  //取消 Vue 所有的日志与警告。
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true; //配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查。

const route=new VueRouter({
    routes:router,
    base:__dirname,
    mode:'history'
});

new Vue({
    router:route,
    render:h=>h(App)
}).$mount('#app');




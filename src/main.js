import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
Vue.use(less)

//引入font-awesome
import 'font-awesome/css/font-awesome.css'

// 使用图片懒加载
import lazyload from 'vue-lazyload'
Vue.use(
  lazyload,{
    loading: require('./common/lazy.jpg')
  }
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

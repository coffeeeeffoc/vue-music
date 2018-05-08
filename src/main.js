import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import './common/stylus/index.styl'
import store from './store'
/* eslint-disable no-unused-vars */
import vConsole from 'vconsole'
// var vConsole = new vConsole()

console.log('test')

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: 'common/images/coffee.png',
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

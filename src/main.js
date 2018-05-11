import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import './common/stylus/index.styl'
import store from './store'
import Loading from './common/images/coffee.png'
/* eslint-disable no-unused-vars */
import vConsole from 'vconsole'
// var vConsole = new vConsole()

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: require('./common/images/coffee.png'),
  loading: Loading
  // attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

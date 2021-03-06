// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import StarRating from 'vue-star-rating'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.component('icon', Icon)
Vue.use(VeeValidate)
Vue.component('star-rating', StarRating)
Vue.use(BootstrapVue)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

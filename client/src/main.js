import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import vuetify from './../plugins/vuetify';

Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:4000/api',
  proxy: true,
  timeout: 20000,
  withCredentials: true,
});
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')

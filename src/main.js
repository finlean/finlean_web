import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import FastClick from 'fastclick';
import tool from './tool';
import api from './api';

Vue.use(api);
Vue.use(tool);

Vue.prototype.$getItem = key => {
  return JSON.parse(window.sessionStorage.getItem('scene_' + key));
};
Vue.prototype.$setItem = (key, data) => {
  return window.sessionStorage.setItem('scene_' + key, JSON.stringify(data));
};
Vue.prototype.$copy = obj => JSON.parse(JSON.stringify(obj));

Vue.config.productionTip = false;
FastClick.attach(document.body);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

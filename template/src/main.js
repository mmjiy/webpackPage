// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from "vuex";
import App from './App'
import router from './router'
import store from './store'
import i18n from "./i18n";
import globalAll from "./global";
import yToast from "Yui/yToast";

import 'lib-flexible/flexible'

Vue.config.productionTip = false

App.i18n = i18n;

/** store */

globalAll.init();

let zindex = 9999;
Vue.use(yToast,{
  getZIndex(){
    return zindex++;
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

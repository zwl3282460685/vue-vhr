import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

import {postKeyValueRequest} from './utils/api'
import {postRequest} from './utils/api'
import {getRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'


Vue.config.productionTip = false
Vue.use(axios)
Vue.use(ElementUI);
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

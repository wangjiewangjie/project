import Vue from 'vue';
import moment from 'moment';
import NP from 'number-precision';
import _ from 'lodash';
import uView from 'uview-ui';
import request from '@/util/ajax/request';
import { router } from '@/util/router/index.js';
import App from './App';
import store from '@/store';
Vue.prototype.$store = store;
Vue.use(router);
Vue.use(uView);

// 平台判断
import platform from '@/util/platform';
Vue.prototype.$platform = platform;

Vue.prototype.$http = request;

Vue.config.productionTip = false;

Vue.filter('dateFormat', (timestamp, type = 'YYYY/MM/DD HH:mm') => {
  return timestamp ? moment(timestamp).format(type) : '--';
});

Vue.filter('nullFormat', (val) => {
  return val === null || val === '' ? '无' : val;
});

Vue.prototype.$moment = moment;
Vue.prototype.$getCent = (data) => {
  return NP.times(data, 100);
};
Vue.prototype.$getCentToYuan = (data) => {
  if (_.isNil(data)) {
    return data;
  }
  return NP.divide(data, 100);
};

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import serviceTimeModule from './modules/serviceTimeModule.js';

const store = new Vuex.Store({
  modules: {
    serviceTimeModule,
  },
});

export default store;

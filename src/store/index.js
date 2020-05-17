import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);
Vue.use(router);

export default new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {},
  actions: {}
});

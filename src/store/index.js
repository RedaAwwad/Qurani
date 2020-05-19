import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import { firebase, getDataCollection } from '../firebase/firebase';

Vue.use(Vuex);
Vue.use(router);

const body = document.querySelector('body');

export default new Vuex.Store({
  state: {
    logged: false,
    user: {},
  },
  mutations: {
    updateUserData(state, data) {
      state.user = data;
    },
    updateUserStatus(state, status) {
      state.logged = status;
    },
  },
  actions: {
    GetUserData(context) {

      firebase.auth().onAuthStateChanged((user) =>  {
        if (user) {
          const userId = user.uid;

          getDataCollection("profiles", userId).then(data => {

            context.commit("updateUserData", data);
              
              window.localStorage.setItem('theme_for_qurani', data.settings.theme);

              context.commit("updateUserStatus", true);

              context.dispatch("triggerThemeData");

          }).catch(err => console.error(err));
        }});
    },
    triggerThemeData() {
      const storedTheme = window.localStorage.getItem('theme_for_qurani');
        if(storedTheme) {
          if(storedTheme === 'dark') body.classList.add('dark');
          else body.classList.remove('dark');
        } else {
          window.localStorage.setItem('theme_for_qurani', 'light');
        }
    },
  },
});

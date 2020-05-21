import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import { firebase, db as firestore, getDataCollection } from '../firebase/firebase';

Vue.use(Vuex);
Vue.use(router);

const body = document.querySelector('body');

const store = new Vuex.Store({
  state: {
    pageLoaded: false,
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
    updatePageLoaded(state, pageStatus) {
      state.pageLoaded = pageStatus;
    }
  },
  actions: {
    async GetUserData(context) {

      await firebase.auth().onAuthStateChanged((user) => {
        
        if (user) {
          getDataCollection("profiles", user.uid).then(data => {

            context.commit("updateUserData", data);
              
            window.localStorage.theme_for_qurani = data.settings.theme;
            
              context.commit("updateUserStatus", true);

            context.dispatch("triggerThemeData");

            context.dispatch("pageLoadedStatus", true);

          }).catch(err => console.error(err));
        } else {
          // Not Logged in
          context.commit("updateUserData", {});

          context.commit("updateUserStatus", false);

          context.dispatch("pageLoadedStatus", true)
        };
      });

    },
    pageLoadedStatus(context, data) {
        context.commit('updatePageLoaded', data);
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

export default store;

import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import { firebase, db } from '@/services/firebase/index';

Vue.use(Vuex);
Vue.use(router);

const body = document.querySelector('body');

const store = new Vuex.Store({
  state: {
    pageLoaded: false,
    logged: false,
    user:  {}
  },
  mutations: {
    UPDATE_USER_DATA(state, data) {
      state.user = data;
    },
    UPDATE_USER_STATUS(state, status) {
      state.logged = status;
    },
    UPDATE_PAGE_LOADED(state, status) {
      state.pageLoaded = status;
    }
  },
  actions: {
    getUserData(context) {

      firebase.auth().onAuthStateChanged((user) => {
        
        if (user) {
          //User Logged in
          db.collection('profiles').doc(user.uid).onSnapshot(docSnapshot => {
              
                let data = docSnapshot.data();

                context.commit("UPDATE_USER_DATA", data);
            
            setTimeout(() =>  context.dispatch("pageLoadedStatus", true), 1500);
                
                window.localStorage.theme_for_qurani = data.settings.theme;
                
                context.commit("UPDATE_USER_STATUS", true);
                
                context.dispatch("triggerThemeData");
            
            }, err => console.log(`Encountered error: ${err}`));

        } else {
          // User Not Logged in
          // context.dispatch("pageLoadedStatus", true);
          setTimeout(() =>  context.dispatch("pageLoadedStatus", true), 1500);

          context.commit("UPDATE_USER_DATA", {});
          
          context.commit("UPDATE_USER_STATUS", false);
          
        };
      });
    },
    pageLoadedStatus(context, status) {
      context.commit('UPDATE_PAGE_LOADED', status);
  },
    triggerThemeData() {
        if(window.localStorage.theme_for_qurani) {
          if(window.localStorage.theme_for_qurani === 'dark') body.classList.add('dark');
          else body.classList.remove('dark');
        } else {
          window.localStorage.setItem('theme_for_qurani',  'light');
        }
    },
  },
});

export default store;

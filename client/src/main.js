import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from './services/i18n/index';
import M from 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.min.css';
import VuePlyr from 'vue-plyr';
// import { firebase } from './services/firebase/index';
import Swal from 'sweetalert2';
// import VueFirestore from 'vue-firestore';

window.Swal = Swal;

M.AutoInit();

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
});

// Vue.use(VueFirestore);

Vue.config.productionTip = false;

// let app;

// firebase.auth().onAuthStateChanged(user => {
//   if (user) window.userId = user.uid;
//   else window.userId = null;
  
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       i18n,
//       render: h => h(App),
//     }).$mount("#app");
//   }
// });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app");

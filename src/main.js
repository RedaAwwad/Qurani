import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from './plugins/i18n';
import M from 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.min.css';
import VuePlyr from 'vue-plyr';
import { firebase } from './firebase/firebase';
import Swal from 'sweetalert2';
import VueFirestore from 'vue-firestore';

window.Swal = Swal;

M.AutoInit();

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false },
    autoplay: true
  },
  emit: ['ended']
});

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
});

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App),
    }).$mount("#app");
  }
});

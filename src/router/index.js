import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reciter from "../views/Reciter.vue";
import Live from "../views/Live.vue";
import Favorite from "../views/Favorite.vue";
import Playlist from "../views/Playlist.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
// import Rating from "../views/Rating.vue";
import { firebase, db } from "../firebase/firebase";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/reciter", name: "reciter", component: Reciter },
  { path: "/live", name: "live", component: Live },
  { path: "/favorite", name: "favorite", component: Favorite },
  { path: "/playlist", name: "playlist", component: Playlist },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged((user) =>  {
        if (user) {
          //user logged in 
            db.collection('profiles').doc(user.uid).onSnapshot(docSnapshot => {
              
              let data = docSnapshot.data();

              if (data.isAdmin) {
                next();
              } else {
                next('/profile');
              }
            }, err => {
              console.log(`Encountered error: ${err}`);
            });

        } else {
          // user not logged in
          next('/');
        };
      });
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  // {path: '/rating', name: 'rating', component: Rating},
  { path: "*", component: Home, redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthorized = firebase.auth().currentUser;

  if (requiresAuth && !isAuthorized) {
    next('/')
  } else {
    next()
  }

  if (window.innerWidth < 767) {
    document.querySelector("body").classList.remove("openMenu");
  }
});

export default router;

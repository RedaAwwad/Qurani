import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reciter from "../views/Reciter.vue";
import Live from "../views/Live.vue";
import Favorite from "../views/Favorite.vue";
import Playlist from "../views/Playlist.vue";
import Profile from "../views/Profile.vue";
import Store from "../store";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/reciter", name: "reciter", component: Reciter },
  { path: "/live", name: "live", component: Live },
  { path: "/favorite", name: "favorite", component: Favorite },
  { path: "/playlist", name: "playlist", component: Playlist },
  { path: "/profile", name: "profile", component: Profile,
  async beforeEnter(to, from, next) {
    try {
      await Store.dispatch("GetUserData");
      if (Store.state.logged) {
        next()
      }
    } catch (e) {
      next({
      path: '/'
      })
    }
  }  },
  { path: "*", component: Home },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

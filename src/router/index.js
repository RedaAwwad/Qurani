import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reciter from "../views/Reciter.vue";
import Live from "../views/Live.vue";
import Favorite from "../views/Favorite.vue";
import Playlist from "../views/Playlist.vue";

Vue.use(VueRouter);

const routes = [
  {path: "/", name: "home", component: Home},
  {path: "/reciter", name: "reciter", component: Reciter},
  {path: "/live", name: "live", component: Live},
  {path: "/favorite", name: "favorite", component: Favorite},
  {path: "/playlist", name: "playlist", component: Playlist}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

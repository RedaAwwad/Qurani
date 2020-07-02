<template>
  <simplebar class="app" data-simplebar-auto-hide="true">
    <div class="files_loader">
      <div class="file_progress" :style="{width: fileLoader + '%'}"></div>
    </div>
    <preloader v-if="!pageLoaded" />
    <navbar v-on:toggleMenu="toggleMenu"/>
    <section class="page_wraper" :class="{ collapsed: menu }">
      <div class="row">
        <div class="col l5 player-wraper">
          <div class="player_container">
            <transition name="slide-fade" mode="out-in">
              <div class="reloading_player" v-if="!playing">
                <img
                  src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif"
                  alt="loading"
                />
              </div>
              <player
                class="player_now"
                :playerStream="playerStream"
                :getStreamTitle="getStreamTitle"
                :autoplay="autoplay"
                v-if="playing"
              />
            </transition>
            <transition name="slide-fade" mode="out-in">
              <div class="info_card" v-if="playing">
                <span>{{ $t("info") }}</span>
                <a href="https://www.mp3quran.net/" target="_blank"
                  >mp3quran.net</a
                >
              </div>
            </transition>
          </div>
        </div>
        <div class="col l7">
          <div class="row pages_container">
            <transition name="slide-fade" mode="out-in">
              <router-view
                :menu="menu"
                :streamLink="streamLink"
                v-on:updateStream="updateStream($event)"
                v-on:reFirePlayer="reFirePlayer"
              />
            </transition>
          </div>
        </div>
      </div>
    </section>
    <sidebar :menu="menu" />
    <!-- Modal Structure For Login and Register -->
    <div v-if="!logged">
      <login-modal />
      <register-modal v-on:updateFileLoader="updateFileLoader"/>
    </div>
  </simplebar>
</template>
<script>
import Materialize from "materialize-css";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { mapState } from "vuex";

export default {
  name: "Main",
  components: {
    simplebar,
    Preloader,
    Navbar,
    Sidebar,
    Player,
    LoginModal,
    RegisterModal,
  },
  data() {
    return {
      menu: true,
      streamLink: "https://server13.mp3quran.net/basit_mjwd/001.mp3",
      streamTitle: "الفاتحة",
      playing: true,
      autoplay: false,
      fileLoader: 0
    };
  },
  computed: {
    ...mapState(["logged", "pageLoaded"]),
    playerStream() {
      return this.streamLink;
    },
    getStreamTitle() {
      return this.streamTitle;
    },
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
      document.querySelector("body").classList.toggle("openMenu");
    },
    updateStream(track) {
      this.streamLink = track.url || track.radio_url;
      this.streamTitle = track.name;
    },
    reFirePlayer() {
      this.autoplay = true;
      this.playing = false;
      setTimeout(() => (this.playing = true), 2000);
    },
    updateFileLoader(progress) {
      this.fileLoader = progress;
    }
  },
  mounted() {
    Materialize.AutoInit();

    this.$store.dispatch('getUserData');
  }
};
</script>

<style lang="scss">
@import "./style/_main.scss";
</style>

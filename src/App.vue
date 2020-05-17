<template>
  <simplebar class="app" data-simplebar-auto-hide="true">
    <preloader v-if="!page_loaded" />
    <navbar v-on:toggleMenu="toggleMenu" />
    <section class="page_wraper" :class="{collapsed: menu}">
      <div class="row">
        <div class="col l5">
          <div class="player_container">
            <transition name="slide-fade" mode="out-in">
              <div class="reloading_player" v-if="!playing">
                <img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif" alt="loading">
              </div>
              <player class="player_now" :playerStream="playerStream" 
              :getStreamTitle="getStreamTitle" v-if="playing" />
            </transition>
            <transition name="slide-fade" mode="out-in">
              <div class="info_card" v-if="playing">
                <span>{{ $t('info') }}</span>
                <a href="https://www.mp3quran.net/" target="_blank">mp3quran.net</a>
              </div>
            </transition>
          </div>
        </div>
        <div class="col l7">
          <div class="row pages_container">
            <transition name="slide-fade" mode="out-in">
              <router-view :menu="menu" :streamLink="streamLink" v-on:updateStream="updateStream($event)" 
              v-on:reFirePlayer="reFirePlayer"/>
            </transition>
          </div>
        </div>
      </div>
    </section>
    <sidebar :menu="menu" />
    <!-- Modal Structure For Login and Register -->
    <login-modal />
    <register-modal />
  </simplebar>
</template>
<script>
  import Materialize from 'materialize-css';
  import simplebar from 'simplebar-vue';
  import 'simplebar/dist/simplebar.min.css';
  import Preloader from '@/components/Preloader';
  import Navbar from '@/components/Navbar';
  import Sidebar from '@/components/Sidebar';
  import Player from '@/components/Player';
  import LoginModal from '@/components/LoginModal';
  import RegisterModal from '@/components/RegisterModal';
  
  export default {
    name: 'Main',
    components: {
      simplebar,
      Preloader,
      Navbar,
      Sidebar,
      Player,
      LoginModal,
      RegisterModal
    },
    data() {
      return {
        page_loaded: false,
        menu: true,
        streamLink: 'https://server13.mp3quran.net/basit_mjwd/001.mp3',
        streamTitle: 'الفاتحة',
        playing: true
      }
    },
    computed: {
      playerStream() {
        return this.streamLink;
      },
      getStreamTitle() {
        return this.streamTitle;
      }
    },
    methods: {
      toggleMenu() {
        this.menu = !this.menu;
        document.querySelector('body').classList.toggle('openMenu');
      },
      updateStream(track) {
        this.streamLink = track.link || track.radio_url;
        this.streamTitle = track.name;
      },
      reFirePlayer() {
        this.playing = false;
        setTimeout(() => this.playing = true, 2000);
      }
    },
    mounted () {
      Materialize.AutoInit();

      window.addEventListener('load', () => this.page_loaded = true);
    }
  }
</script>

<style lang="scss">
  @import './style/_main.scss';
  .app {
    height: 100vh !important;
    overflow: hidden;
    overflow-y: auto;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s;
  }
  .slide-fade-enter, 
  .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  .page_wraper {
    padding: 2rem;
    transition: 0.5s;
    transition-delay: 0.2s;
    &.collapsed {
      margin-right: 20%;
    }
    ul {height: 500px;}

    @media screen and (max-width: 991px) {
      &.collapsed {
        margin-right: 30%;
      }
    }

    @media screen and (max-width: 767px) {
      &.collapsed {
        margin-right: 0;
      }
    }

    @media screen and (max-width: 480px) {
      padding: 2rem 0;
    }

  }
  

  .player_container {
    padding-top: 40%;
    @media screen and (max-width: 991px) {
      padding-top: 75px;
      padding-bottom: 3em;
    }

    @media screen and (max-width: 480px) {
      padding-bottom: 1.5rem;
    }

    .reloading_player {
      min-height: 170px;
      text-align: center;
      img {
        max-width: 100%; 
        max-height: 200px;
      }
    }

    .info_card {
      margin-top: 3rem;
      font-size: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      direction: rtl;
      @media screen and (max-width: 480px) {
        margin-top: 1.5rem;
      }
    }
  }

  body.rtl {
    
  }
</style>

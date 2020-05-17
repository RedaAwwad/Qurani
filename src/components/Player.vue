<template>
  <transition name="slide-fade">
    <div :class="{player_fullscreen : fullScreen}">
      <div class="player">
        <div class="player_cover">
          <span class="fullScreen" v-if="!fullScreen" @click="toggleFullScreen(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          </span>
          <span class="fullScreen" v-if="fullScreen" @click="toggleFullScreen(false)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
          </span>
          <img src="../assets/quran.jpg" alt="qurani">
          <div class="track_title">
            {{ getStreamTitle }}
          </div>
        </div>
        <vue-plyr ref="plyr">
          <audio>
            <source :src="playerStream" type="audio/mp3"/>
          </audio>
        </vue-plyr>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Player',
    props: ['playerStream', 'getStreamTitle'],
    data() {
      return {
        fullScreen: false
      }
    },
    computed: {
      player () {
        return this.$refs.plyr.player
      }
    },
    mounted () {
      document.addEventListener('keydown', (e) => {if(e.keyCode === 27) this.fullScreen =  false});
    },
    methods: {
      toggleFullScreen(status) {
        this.fullScreen = status;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/_vars.scss';

  .player_fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fullScreen 0.5s ease-in-out;
    background: url('../assets/land2.jpg') no-repeat center;
    background-size: cover;
    @keyframes fullScreen {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .player {
      max-width: 500px;
      animation: full 0.5s ease-in-out;
      @keyframes full {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
    }
    @media screen and (max-width: 480px) {
      padding: 1rem;
    }
  }
  .player {
    width: 100%;
    position: sticky;
    top: 150px;
    transition: 0.6s;
    .player_cover {
      height: 150px;
      background: #fff;
      position: absolute;
      top: -85px;
      width: 100%;
      left: 0;
      border-radius: 20px 20px 0 0;
      z-index: 2;
      box-shadow: 0 -3px 20px rgba(199, 199, 199, 0.45);
      .fullScreen {
        position: absolute;
        top: 10%;
        right: 5%;
        z-index: 9;
        cursor: pointer;
        svg path {stroke: $main;}
      }
      img {
        width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
      }
      .track_title {
        position: absolute;
        left: 0;
        width: 100%;
        height: auto;
        z-index: 22;
        text-align: center;
      }
    }

  }
  
</style>
<template>
  <div>
    <search v-on:updateSearchedData="updateSearchedData($event)"/>
    
    <loading v-if="loading" />

    <div v-if="!loading" class="reciter_container">
      <div v-if="!searchedData.length" class="no-result">
        لا توجد نتائج
      </div>
      <div v-for="reciter in searchedData" :key="reciter.id" class="col m6">
        <div class="card horizontal">
          <div class="card-image" @click="showReciter(reciter.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div class="center-align">
                <h6>{{ reciter.name }}</h6>
              </div>
              <div class="details">
                <span>{{ reciter.count}}</span>
                <span>سورة</span>
              </div>
              <div class="details">
                <span>رواية:</span>
                <span>{{ reciter.rewaya }}</span>
              </div>
            </div>
            <div class="card-action">
              <span class="btn_card" @click="addToFavorite(reciter)" 
               :class="reciter.added ? 'added' : ''">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  import Search from '@/components/Search';
  import axios from 'axios';
  import {mapState} from 'vuex';
  import { updateDataCollection } from '../services/firebase/index';

  export default {
    name: "home",
    components: {
      Loading, 
      Search
    },
    props: ['menu'],
    data() {
      return {
        loading: true,
        reciters: [],
        searched: '',
      }
    },
    computed: {
      ...mapState(['logged', 'user']),
      searchedData() {
        if(this.favouriteReciters) {
          let favsIds = this.favouriteReciters.map(fav => fav.id);
          this.reciters.forEach(rec => {
            favsIds.includes(rec.id) ? rec.added = true : rec.added = false;
          });
        }

        if(this.reciters !== undefined) return this.reciters.filter((rec) => rec.name.match(this.searched)); else return [];
      },
      favouriteReciters() {
        return this.user.favouriteReciters;
      }
    },
    methods: {
      getReciters() {
        axios.get("https://qurani-api.herokuapp.com/api/reciters")
        .then(res => this.reciters = res.data)
        .catch(err =>console.log(err.message))
        .finally(_=>  this.loading = false);
      },
      showReciter(reciter) {
        this.$router.push(`/reciter/${reciter}`);
      },
      updateSearchedData(data) {
        this.loading = true;
        this.searched = data;
        setTimeout(() => {this.loading = false;}, 1000);
      },
      addToFavorite(reciter) {
          if(this.logged) {
            let same = false;
            if(!this.favouriteReciters) {
              updateDataCollection('profiles', this.user.uid, {favouriteReciters: [reciter]})
              .then(_ =>  M.toast({html: 'تمت الإضافة'}));
              return false;
            }
        
            this.favouriteReciters.forEach(rec => {
              if(rec.id === reciter.id) same = true
            })
            
            if(!same) {
              updateDataCollection('profiles', this.user.uid, {
                  favouriteReciters: [...this.favouriteReciters, reciter]
              }).then(_ =>  M.toast({html: 'تمت الإضافة'}))
            } else {
              M.toast({html: 'موجود بالفعل'});
            }
          } else {
              M.toast({html: 'يجب تسجيل الدخول أولآ'});
          }
      }
      
    },
    mounted () {
      this.getReciters();
    },
    distroyed() {
      this.loading = true;
    }
  };
</script>
<style lang="scss" scoped>
    .home {position: relative;}
    @import '../assets/style/card';
    .reciter_container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .no-result {
        margin-top: 1rem;
      }
    }

</style>

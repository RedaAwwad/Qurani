<template>
  <div class="playlist">
    <search v-on:updateSearchedData="seraching"/>
    <div class="section_content" v-if="!logged">
          <div class="no_login_msg">
            يجب تسجيل الدخول أولا 
          </div>
    </div>
    <div class="section_content" v-if="logged">
          <div class="no_login_msg" v-if="!favPlaylist">
            لا توجد نتائج - يمكنك إضافة سور للقائمة
          </div>
          <div class="row playlist_container">
            <div class="col m6" v-for="play in favPlaylist" :key="play.id">
                <div class="card horizontal" :class="play.link == trackUi ? 'active' : ''">
                  <div @click="playSura(play)" class="card-image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      <div class="playing_ui">
                        <span></span> <span></span>
                        <span></span> <span></span>
                        <span></span> <span></span> 
                        <span></span> <span></span>
                      </div>
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <div class="center-align">
                        <h6>{{ play.name }}</h6>
                      </div>
                      <div class="details">
                        <span>{{ play.reciter }}</span>
                      </div>
                      <div class="details">
                        <span>رواية:</span>
                        <span>{{ play.rewaya }} </span>
                      </div>
                    </div>
                    <div class="card-action">
                <span @click="deleteSura(play)" class="delete_reciter"> <i class="material-icons">delete</i></span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search';
  import {mapState} from 'vuex';
  import { db } from '../firebase/firebase';

  export default {
    name: 'Playlist',
    components: {Search},
    props: ['streamLink'],
    data() {
      return {
        searched: ''
      }
    },
    computed: {
      ...mapState(['logged', 'user']),
      favPlaylist() {
        if(!this.user.playlist) {
          return this.user.playlist;
        } else {
          return this.user.playlist.filter((rec) => rec.name.toLowerCase().match(this.searched));
        }
      },
      trackUi() {
        return this.streamLink;
      }
    },
    methods: {
        seraching(val) {
          this.searched = val;
      },
      playSura(sura) {
          if(this.trackUi != sura.link) {
            this.$emit('updateStream', sura);
            this.$emit('reFirePlayer');
          }
      },
      deleteSura(sura) {
          Swal.fire({
					title: `هل تريد الحذف؟`,
					confirmButtonText: 'نعم',
					cancelButtonText: 'لا',
					showCancelButton: true
				}).then (res=> {
						if(res.value) {
                const allFavRec = this.favPlaylist.filter(ele => ele.id !== sura.id);
                if(allFavRec <= 0) {
                    db.collection('profiles').doc(this.user.uid).update({
                    playlist: null
                }).then(_ =>  M.toast({html: 'تم الحذف'})).catch(_=> M.toast({html: 'خطأ'}))
                } else {
                    db.collection('profiles').doc(this.user.uid).update({
                      playlist: [...allFavRec]
                  }).then(_ =>  M.toast({html: 'تم الحذف'})).catch(_=> M.toast({html: 'خطأ'}))
                }
						}
				})
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../style/_card.scss';
    .playlist_container {
      margin-top: 1rem;
    }
    .delete_reciter {
      cursor: pointer;
      color: #ee6e73;
    }
</style>
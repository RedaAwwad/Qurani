<template>
  <div class="favorite">
    <search v-on:updateSearchedData="seraching"/>
    <div class="section_content" v-if="!logged">
          <div class="no_login_msg">
            يجب تسجيل الدخول أولا 
          </div>
    </div>
    <div class="section_content"  v-if="logged">
          <div class="no_login_msg" v-if="!favouriteReciters">
            لا توجد نتائج - يمكنك الإضافة من قائمة القرّاء
          </div>
          <div class="row fav_container">
            <card  v-for="reciter in favouriteReciters" 
            :key="reciter.id" :reciter="reciter" v-on:deleteFavRec="deleteFavRec"/>
          </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search';
  import Card from '@/components/Card';
  import {mapState} from 'vuex';
  // import { db } from '@/services/firebase/index';

  export default {
    name: 'Favorite',
    components: {Search, Card},
    data() {
      return {
        searched: ''
      }
    },
    computed: {
      ...mapState(['logged', 'user']),
      favouriteReciters() {
        if(!this.user.favouriteReciters) {
          return this.user.favouriteReciters;
        } else {
          return this.user.favouriteReciters.filter((rec) => rec.name.toLowerCase().match(this.searched));
        }
      },
    },
    methods: {
      seraching(val) {
          this.searched = val;
      },
      deleteFavRec(rec) {
        Swal.fire({
					title: `هل تريد حذف ${rec.name} من المفضلة؟`,
					confirmButtonText: 'نعم',
					cancelButtonText: 'لا',
					showCancelButton: true
				}).then (res=> {
						if(res.value) {

                const allFavRec = this.favouriteReciters.filter(ele => ele.id !== rec.id);

                if(allFavRec <= 0) {
                    db.collection('profiles').doc(this.user.uid).update({
                    favouriteReciters: null
                }).then(_ =>  M.toast({html: 'تم الحذف'})).catch(_=> M.toast({html: 'خطأ'}))
                } else {
                    db.collection('profiles').doc(this.user.uid).update({
                      favouriteReciters: [...allFavRec]
                  }).then(_ =>  M.toast({html: 'تم الحذف'})).catch(_=> M.toast({html: 'خطأ'}))
                }
						}
				})
      }
    },
  }
</script>

<style lang="scss" scoped>
    .favorite {height: 100%;}
    .fav_container {
      margin-top: 1rem;
    }

</style>
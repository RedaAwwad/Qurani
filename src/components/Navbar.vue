<template>
    <nav class="navbar_container white">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo blue-text">{{ $t('logo') }}</router-link>
      <ul class="right">
        <li v-if="user.isAdmin" class="hidden_small_screen">
          <router-link  to="/admin" class="btn_admin">Admin</router-link>
        </li>
        <li class="navbar_logout hidden_small_screen" v-if="logged">
          <button @click="logout" type="button" class="btn_style"><span> الخروج </span> <span class="out">تسجيل </span> </button>
        </li>
        <li><a href="javascript:;" @click="toggleMenu" class="blue-text"><i class="material-icons">menu</i></a></li>
        <li><a href="javascript:;" class="blue-text dropdown-trigger" data-target='dropdown1'><i class="material-icons">more_vert</i></a></li>
        <!-- Dropdown Structure -->
        <ul id='dropdown1' class='dropdown-content'>
          <!-- <li><a href="#!" class="blue-text">English</a></li>
          <li><a href="#!" class="blue-text">عربى</a></li>
          <li class="divider" tabindex="-1"></li> -->
          <li @click="changeTheme('light')"><a href="javascript: ;" class="blue-text">ساطع</a></li>
          <li @click="changeTheme('dark')"><a href="javascript: ;" class="black-text">غامق</a></li>
          <li v-if="user.isAdmin" class="hidden_big_screen">
          <router-link  to="/admin" class="btn_admin">Admin</router-link>
        </li>
        <li class="navbar_logout hidden_big_screen" v-if="logged">
          <button @click="logout" type="button" class="btn_style"><span> الخروج </span> <span class="out">تسجيل </span> </button>
        </li>
        </ul>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex';
  import { firebase, updateDataCollection } from '../firebase/firebase';

  const body = document.querySelector('body');
  export default {
    name: 'Navbar',
    computed: {
      ...mapState(['logged', 'user'])
    },
    methods: {
      toggleMenu() {
        this.$emit('toggleMenu');
        // document.querySelector('body'.classList.toggle('openMenu'))
      },
      changeTheme(theme) {
          if(theme === 'dark' && window.localStorage.theme_for_qurani !== 'dark') {

            this.$store.dispatch('pageLoadedStatus', false);

            window.localStorage.theme_for_qurani = theme;

            this.$store.dispatch('triggerThemeData');

            if(this.logged) {

                updateDataCollection('profiles', this.user.uid, {
                    settings: {theme: theme}
                } ).then( res => {

                M.toast({html:   res });

                }).catch(err => console.log(err));
            } else {setTimeout(() =>  this.$store.dispatch("pageLoadedStatus", true), 1500);}

          } else if(theme === 'light' && window.localStorage.theme_for_qurani !== 'light') {

              this.$store.dispatch('pageLoadedStatus', false);

              window.localStorage.theme_for_qurani = theme;

            this.$store.dispatch('triggerThemeData');

            if(this.logged) {

                updateDataCollection('profiles', this.user.uid, {
                    settings: { theme: theme }
                } ).then( res=> {

                M.toast({html:   res });
                
                  }).catch(err => console.log(err));
            } else {setTimeout(() =>  this.$store.dispatch("pageLoadedStatus", true), 1500);}
          }
      },
      logout() {

        Swal.fire({
        title: 'هل تريد تسجيل الخروج؟',
        confirmButtonText: 'نعم',
        cancelButtonText: 'لا',
        showCancelButton: true,
      }).then (res=> {
        
        if(res.value) {

          firebase.auth().signOut().then(() => {

          this.$store.dispatch('getUserData');

          this.$router.go({ name: "home"});

          M.toast({html: 'تم تسجيل الخروج'});

        }).catch((error) => console.log(error));

        }});
      }
    },
    mounted() {
      this.$store.dispatch('triggerThemeData');
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/_navbar.scss';
</style>
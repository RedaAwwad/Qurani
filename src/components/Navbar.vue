<template>
    <nav class="navbar_container white">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo blue-text">{{ $t('logo') }}</router-link>
      <ul class="right">
        <li><a href="javascript:;" @click="toggleMenu" class="blue-text"><i class="material-icons">menu</i></a></li>
        <li><a href="javascript:;" class="blue-text dropdown-trigger" data-target='dropdown1'><i class="material-icons">more_vert</i></a></li>
        <!-- Dropdown Structure -->
        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="#!" class="blue-text">English</a></li>
          <li><a href="#!" class="blue-text">عربى</a></li>
          <li class="divider" tabindex="-1"></li>
          <li><a href="#!" class="blue-text">Light</a></li>
          <li><a href="#!" class="blue-text">Dark</a></li>
        </ul>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      toggleMenu() {
        this.$emit('toggleMenu')
      }
    },
  }
</script>

<style lang="scss" scoped>

.navbar_container {
  padding: 0 20px;
  box-shadow: none;
  border-bottom: 1px solid  #f2f2f2;
  box-shadow: 0px 3.5px 10px rgba(199, 199, 199, 0.45);
  position: sticky;
  top: 0;
  z-index: 100;
  .brand-logo {left: auto; transform: none;}
}
</style>
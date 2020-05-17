<template>
  <form class="search_form">
    <div class="input-field">
      <input id="search" v-model="search" @keyup="updateSearch()" type="search" placeholder="Search" required>
      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
      <i class="material-icons">close</i>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'Search',
    data() {
      return {
        search: ''
      }
    },
    methods: {
      updateSearch() {
        this.$emit('updateSearchedData', this.search.toLowerCase());
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search_form {
    background-color: #fff;
    padding-top: 0.5rem;
    border-radius: 5px;
    position: sticky;
    top: 70px;
    box-shadow: 5px 3px 20px rgba(199, 199, 199, 0.45);
    z-index: 99;
    input[type="search"] {
      padding: 0 2rem;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      border-bottom: none;
      border-bottom: 1px solid transparent !important;
      &:focus {
        background-color: transparent !important;
        border-bottom: 1px solid #0969cc !important;
      }
    }
    @media screen and (max-width: 480px) {
      top: 63px;
      input[type="search"] {
        padding: 0 3rem;
        width: 70%;
      }
    }
  }
</style>
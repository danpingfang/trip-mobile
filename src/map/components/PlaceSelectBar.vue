<template>
  <div class="place-select-bar" v-if="list" transition="fadeIn">
    <span>已推荐：</span>
    <place-select-list :list="list"></place-select-list>
  </div>
</template>

<style lang="scss">
  @import "../styles/_PlaceSelectBar.scss";
</style>

<script>
  import PlaceSelectList from './PlaceSelectList';

  export default {
    props: ['list'],
    components: {
      PlaceSelectList
    }
  };
</script>

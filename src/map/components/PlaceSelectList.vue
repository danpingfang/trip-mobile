<template>
  <div class="place-select-list" v-if="list">
    <span class="place-select-item" v-for="place in list">{{place.name}}
      <button type="button" class="button-place-close"
              @touchend="remove(place)"></button></span>
  </div>
</template>

<style lang="scss">
  @import "../styles/_PlaceSelectList.scss";
</style>

<script>
  export default {
    props: ['list'],
    methods: {
      remove(place) {
        this.$dispatch('onRemovePlace', place);
      }
    }
  };
</script>

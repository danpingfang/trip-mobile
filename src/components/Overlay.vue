<template>
  <div class="ui-overlay animated"
       v-if="show" transition='fade'></div>
</template>

<style lang="scss">
  @import "./styles/_Overlay.scss";
</style>

<script>
  export default {
    props: ['show']
  };
</script>

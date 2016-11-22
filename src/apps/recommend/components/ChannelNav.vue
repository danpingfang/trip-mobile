<template>
  <ul class="recommend-switcher">
    <li
      :class="['channel-nav-item', currentIndex === $index ? 'selected' : '' ]"
      v-for="item in navList"
      @touchend.prevent.stop="onActive(item, $index)">{{item.name}}
    </li>
  </ul>
</template>

<style lang="sass">
  @import "./styles/ChannelNav.scss";
</style>

<script>
  export default {
    props: ['currentIndex', 'navList'],
    methods: {
      onActive(item, index) {
        this.currentIndex = index;
        this.$dispatch('onActive', item, index);
      }
    }
  };
</script>

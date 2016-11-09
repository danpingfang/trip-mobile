<template>
  <ul class="channel-nav">
    <li v-if="!isLink"
      :class="['channel-nav-item', currentIndex === $index ? 'selected' : '' ]"
      v-for="item in navList"
      @touchend.prevent.stop="onActive(item, $index)">我推荐</li>
    <li v-if="!isLink"
        :class="['channel-nav-item', currentIndex === $index ? 'selected' : '' ]"
        v-for="item in navList"
        @touchend.prevent.stop="onActive(item, $index)">别人推荐</li>
  </ul>
</template>

<style lang="sass">
  @import "/styles/ChannelNav.scss";
</style>

<script>
  export default {
    props: ['navList', 'currentType', 'isLink'],
    data() {
      return {
        currentIndex: 0
      };
    },
    methods: {
      onActive(item, index) {
        this.currentIndex = index;
        this.$dispatch('onActive', item);
      }
    }
  };
</script>

<template>
  <nav class="tab-nav {{styles.classNames}}">
    <a href="javascript:void(0)" @touchend="handleItemClick(item, $index)"
       class="tab-nav-item {{currentIndex === $index ? 'active' : ''}}"
       v-for="item in list">{{item.name}}</a>
  </nav>
</template>

<style lang="scss">
  @import "./styles/_TabNav.scss";
</style>

<script>
  export default {
    props: ['currentIndex', 'list', 'styles'],
    methods: {
      handleItemClick(item, index) {
        this.currentIndex = index;
        this.$dispatch('onTabNavItemClick', item, index);
      }
    }
  };
</script>

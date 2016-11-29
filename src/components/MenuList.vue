<template>
  <ul class="list list--center">
    <li class="list-item" v-for="item in list"
        @touchend="handleItemClick(item)">
      <i class="item-icon icon {{item.styles.iconName}}"></i>
      <span class="item-name">{{item.name}}</span>
      <slot name="extra"></slot>
      <i class="icon icon-arrow-right"></i>
    </li>
  </ul>
</template>

<style lang="scss">
  @import "./styles/_List.scss";
</style>

<script>
  export default {
    props: ['list'],
    methods: {
      handleItemClick(item) {
        this.$dispatch('onItemClick', item);
      }
    }
  };
</script>

<template>
  <div class="search-list-container animated" transition="slide">
    <ul class="search-list">
      <li class="search-item{{ item.isSelected ? ' active' : '' }}"
          v-for="item in list" @touchend="handleSearchItem(item)">
        <div class="search-item-number">{{ $index + 1 }}.</div>
        <div class="search-content">
          <div class="place-title">{{ item.name }}</div>
          <p class="place-location">{{ item.targetNameList.join(' > ') }} {{
            item.address }}</p>
        </div>
        <button class="button button-tick button-search-tick"><i
          class="icon icon-tick"></i></button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "./styles/_SearchList.scss";
</style>

<script>
  export default {
    props: ['list'],
    methods: {
      handleSearchItem(item) {
        item.isSelected = !item.isSelected;
        this.$dispatch('onSelect', item);
      }
    }
  };
</script>

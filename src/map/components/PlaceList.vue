<template>
  <div class="place-list-container animated" transition="slide" v-if="show">
    <ul class="place-list">
      <li class="place-item{{ item.isSelected ? ' active' : '' }}"
          v-for="item in list" @touchend="selectPlace(item)">
        <div class="place-item-number">{{ $index + 1 }}.</div>
        <div class="place-content">
          <div class="place-title">{{ item.name }}</div>
          <p class="place-location">{{ item.targetNameList.join(' > ') }} {{
            item.address }}</p>
        </div>
        <div class="place-item-status" v-if="item.isRecommend">已推荐</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "../styles/_PlaceList.scss";
</style>

<script>
  export default {
    props: ['show', 'list'],
    methods: {
      selectPlace(item) {
        item.isSelected = !item.isSelected;
        this.$dispatch('onSelectPlace', item);
      }
    }
  };
</script>

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
  let previousSelect = null;
  export default {
    props: ['show', 'list'],
    watch: {
      list(list) {
        previousSelect = list[0];
      }
    },
    methods: {
      selectPlace(item) {
        if (previousSelect.poiId === item.poiId) {
          return false;
        }
        if (previousSelect) {
          previousSelect.isSelected = false;
        }
        item.isSelected = true;
        previousSelect = item;
        this.$dispatch('onSelectPlace', item);
        return item;
      }
    }
  };
</script>

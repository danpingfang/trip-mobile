<template>
  <div class="place-card place-card--arrow-up" v-if="item">
    <div class="place-card-content">
      <div class="place-type place-type--{{item.poiType}}">
        {{text | getPlaceTypeText}}
      </div>
      <div class="place-info">
        <div class="place-title">{{name}}</div>
        <p class="place-location">{{locationText | getLocationText}}</p>
      </div>
    </div>
    <button type="button" class="button-place-recommend">
      <i class="icon icon-place-recommend"></i><span>{{item.isRecommend ? '已推荐' : '推荐该地点'}}</span>
    </button>
  </div>
</template>

<style lang="scss">
  @import "../styles/_PlaceCard.scss";
</style>

<script>
  import config from '../config';

  export default {
    props: ['item'],
    filters: {
      getPlaceTypeText() {
        return config.placeTypes[this.item.poiType].text;
      },
      getLocationText() {
        return `${this.item.targetNameList.join(' > ')}${this.item.address}`;
      }
    }
  };
</script>

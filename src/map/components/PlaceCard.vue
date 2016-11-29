<template>
  <div class="place-card animated {{styleConfig.classNames}}" transition="slide"
       v-if="place">
    <div class="place-card-content">
      <div class="place-info">
        <div class="place-title">{{place.name}}</div>
        <p class="place-location">{{locationText | getLocationText}}</p>
      </div>
      <!--<img :src="place.coverImageUrl" alt="{{place.name}}">-->
    </div>
  </div>
</template>

<style lang="scss">
  @import "../styles/_PlaceCard.scss";
</style>

<script>
  import config from '../config';

  export default {
    props: ['styleConfig', 'place'],
    filters: {
      getPlaceTypeText() {
        return config.placeTypes[this.place.poiType].text;
      },
      getLocationText() {
        return `${this.place.targetNameList.join(' > ')}${this.place.address}`;
      }
    }
  };
</script>

<template>
  <div class="place-search-container page {{ show ? 'slideIn' : 'slideOut'}}" v-show="show">
    <search-bar></search-bar>
    <place-select-bar :list="recommendList"></place-select-bar>
    <place-map :show="show" v-ref:place-map></place-map>
    <place-list :list="placeList" :show="showPlaceList"
                v-ref:placeList></place-list>
    <button v-if="!recommendList && showPlaceList"
            class="button button-full button-fixed button-fixed--bottom button-disable"
            type="button">
      完成
    </button>
    <button v-if="recommendList && showPlaceList" @touchend.prevent.stop="confirm"
            class="button button-full button-fixed button-fixed--bottom button-confirm"
            type="button">完成
    </button>
  </div>
</template>

<style lang="scss">
  @import "../styles/_PlaceSearch.scss";
</style>

<script>
  import SearchBar from './SearchBar';
  import PlaceSelectBar from './PlaceSelectBar';
  import PlaceMap from './PlaceMap';
  import PlaceCard from './PlaceCard';
  import PlaceList from './PlaceList';

  export default {
    props: ['show'],
    data() {
      return {
        showPlaceList: false,
        recommendList: null,
        placeList: null
      };
    },
    components: {
      SearchBar,
      PlaceSelectBar,
      PlaceMap,
      PlaceList,
      PlaceCard
    },
    events: {
      onSearchBeforeSend() {
        this.showPlaceList = false;
      },
      onSearch(results) {
        this.showPlaceList = true;
        this.renderPlaceList(results);
        this.$refs.placeMap.addSearchPlace(results[0]);
      },
      onSelectPlace(place) {
        if (place.isSelected) {
          this.$refs.placeMap.addSearchPlace(place);
        } else {
          this.$refs.placeMap.removeSearchPlace(place);
        }
      },
      onRemovePlace(place) {
        this.removePlace(place);
        this.$refs.placeMap.setRecommendButtonText(place);
      },
      onRecommendPlace(place) {
        let found = false;
        if (this.recommendList) {
          for (let i = 0; i < this.recommendList.length; i++) {
            const item = this.recommendList[i];
            if (item.poiId === place.poiId) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.recommendList.push(place);
          }
        } else {
          this.recommendList = [].concat(place);
        }
        place.isRecommend = true;
      }
    },
    methods: {
      renderPlaceList(list) {
        this.placeList = list.map((item, index) => {
          item.isSelected = index === 0;
          item.isRecommend = false;
          return item;
        });
      },
      removePlace(place) {
        if (this.recommendList) {
          this.recommendList = this.recommendList.filter((item) => {
            return item.poiId !== place.poiId;
          });
          if (!this.recommendList.length) {
            this.recommendList = null;
          }
          place.isRecommend = false;
        }
      },
      confirm() {
        this.show = false;
        this.$dispatch('onAdd', this.recommendList);
      }
    }
  };
</script>

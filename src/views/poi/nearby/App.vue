<template>
  <place-map :show="showPlaceMap" v-ref:map></place-map>
  <place-card :place="place"
              :style-config="{classNames: 'place-card--medium'}"></place-card>
  <div class="place-types-bar">
    <place-types-list :selected-index="0"
                      :list="placeTypesList"></place-types-list>
  </div>
</template>

<script>
  import config from '../../../config';
  import $ from 'jquery';
  import PlaceMap from '../../../map/components/PlaceMap';
  import PlaceCard from '../../../map/components/PlaceCard';
  import PlaceTypesList from '../../../map/components/PlaceTypesList';
  const jsConfig = window.jsConfig;
  const url = `${config.apiUrl}/poi/nearby?` +
    `poiId=${jsConfig.poiId}&poiGroup=${jsConfig.poiGroup}` +
    `&source=${jsConfig.source}`;
  const poiType = jsConfig.poiType;

  export default {
    data() {
      return {
        showPlaceMap: false,
        place: null,
        placeTypesList: jsConfig.placeTypesList
      };
    },
    components: {
      PlaceMap,
      PlaceCard,
      PlaceTypesList
    },
    events: {
      onTypesClick(place) {
        this.place = null;
        this.getNearbyList(place.type);
      },
      onPlaceMarkerClick(place) {
        this.place = place;
      }
    },
    created() {
      this.getNearbyList(poiType);
    },
    ready() {
      this.showPlaceMap = true;
    },
    methods: {
      getNearbyList(type) {
        $.ajax({
          url,
          dataType: 'json',
          data: {
            poiType: type
          },
          xhrFields: {
            withCredentials: true
          }
        }).done((response) => {
          if (response.code === 0) {
            this.$refs.map.addNearbyPlace(response.data.nearbys);
          }
        });
      }
    }
  };
</script>

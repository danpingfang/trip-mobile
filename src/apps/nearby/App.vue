<template>
  <place-map :show="showPlaceMap" v-ref:map></place-map>
  <place-card :item="placeItem"></place-card>
  <div class="place-types-bar">
    <place-types-list :selected-index="0"
                      :list="placeTypesList"></place-types-list>
  </div>
</template>

<script>
  import PlaceMap from '../../map/components/PlaceMap';
  import PlaceCard from '../../map/components/PlaceCard';
  import PlaceTypesList from '../../map/components/PlaceTypesList';

  export default {
    data() {
      return {
        showPlaceMap: false,
        placeItem: null,
        placeTypesList: [
          {
            iconName: 'eat',
            type: 'eat',
            name: '餐饮'
          },
          {
            iconName: 'room',
            type: 'hotel',
            name: '住宿'
          },
          {
            iconName: 'point',
            type: 'point',
            name: '景点'
          },
          {
            iconName: 'shop',
            type: 'buy',
            name: '购物'
          },
          {
            iconName: 'traffic',
            type: 'traffic',
            name: '交通'
          }
        ]
      };
    },
    components: {
      PlaceMap,
      PlaceCard,
      PlaceTypesList
    },
    events: {
      onTypesClick(typeItem) {
        console.log(typeItem);
      }
    },
    ready() {
      this.showPlaceMap = true;
    },
    methods: {}
  };
</script>

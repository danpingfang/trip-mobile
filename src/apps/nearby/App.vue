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
            type: 'eat',
            name: '餐饮'
          },
          {
            type: 'room',
            name: '住宿'
          },
          {
            type: 'scenic',
            name: '景点'
          },
          {
            type: 'shop',
            name: '购物'
          },
          {
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

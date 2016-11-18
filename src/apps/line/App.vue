<template>
  <div class="line">
    <place-map :show="showPlaceMap" v-ref:map></place-map>
    <line-place-bar :line-place-list="lines"
                    :current-index="currentIndex"></line-place-bar>
  </div>
</template>

<script>
  import PlaceMap from '../../map/components/PlaceMap';
  import LinePlaceBar from '../../map/components/LinePlaceBar';

  let lines = window.jsConfig.lines;
  const all = {
    targetName: '总线路',
    nodes: []
  };
  lines.map((line) => {
    all.nodes = all.nodes.concat(line.nodes);
    return line;
  });
  lines = [all].concat(lines);

  export default {
    data() {
      return {
        showPlaceMap: false,
        currentIndex: 0,
        lines
      };
    },
    components: {
      PlaceMap,
      LinePlaceBar
    },
    events: {
      onChangeLinePlace(place) {
        this.createPlace(place.nodes);
      }
    },
    ready() {
      this.$refs.map.init();
      this.createPlace(lines[this.currentIndex].nodes);
    },
    methods: {
      createPlace(nodes) {
        this.$refs.map.addLinePlace(nodes.filter((item) => {
          return item.nodeType === 'poi';
        }));
      }
    }
  };
</script>

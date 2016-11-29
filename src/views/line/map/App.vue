<template>
  <div class="line">
    <place-map :show="showPlaceMap" v-ref:map></place-map>
    <line-place-bar :line-place-list="lines"
                    :current-index="currentIndex"></line-place-bar>
  </div>
</template>

<script>
  import getParameterByName from '../../../utils/getParameterByName';
  import touchBrokenFix from '../../../common/touchBrokenFix';
  import PlaceMap from '../../../map/components/PlaceMap';
  import LinePlaceBar from '../../../map/components/LinePlaceBar';

  let lines = window.jsConfig.lines;
  let currentIndex = 0;
  const targetId = getParameterByName('targetId');
  const all = {
    targetName: '总线路',
    nodes: []
  };
  lines.map((line, index) => {
    all.nodes = all.nodes.concat(line.nodes);
    if (line.targetId === targetId) {
      currentIndex = index + 1;
    }
    return line;
  });
  lines = [all].concat(lines);

  export default {
    data() {
      return {
        showPlaceMap: false,
        currentIndex,
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
      touchBrokenFix();
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

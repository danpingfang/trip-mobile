<template>
  <div class="lineGethers" v-for="gether in list">
    <div class="cd-timeline-block" v-for="node in gether.nodes"
         v-if="node.nodeType === 'poi'">
      <div class="dot"></div>
      <div class="recommend-head">
        <div class="sign-container">
          <p class="sign play" v-if="node.poiType === 'play'">玩</p>
          <p class="sign eat" v-if="node.poiType === 'eat'">吃</p>
          <p class="sign live" v-if="node.poiType === 'hotel'">住</p>
          <p class="sign shopping" v-if="node.poiType === 'buy'">购</p>
          <p class="sign traffic" v-if="node.poiType === 'traffic'">交</p>
        </div>
        <div class="recommend-title">
          <p class="name">{{node.poiName}}</p>
          <p class="position">{{node.targetName}} {{node.poiAddress}}</p>
        </div>
      </div>
      <div class="recommend-detail">
        <div class="detail-info">
          <p class="tips">
            {{node.remark}}
          </p>
        </div>
      </div>
    </div>
    <div class="cd-timeline-block" v-if="node.nodeType === 'passage'">
      <div class="dot"></div>
      <p class="special-note">
        {{node.remark}}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['list']
  };
</script>
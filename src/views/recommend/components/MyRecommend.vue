<template>
  <div class="my-recommend" v-for="item in list" @touchend="onClick">
    <div class="already-adopt" v-if="item.status === 'accept'">
      <img src="/static/images/icon_yicaina2x.png" alt="已采纳" width="64"
           height="64"/>
    </div>
    <ol class="attractions"
        v-if="item.rcmdPoiList && item.rcmdPoiList.length > 0">
      <li v-for="replyNode in item.rcmdPoiList">{{$index + 1}}. {{replyNode.name}}</li>
    </ol>
    <div class="detail-info">
      <p class="tips">
        {{item.remark}}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['list']
  };
</script>

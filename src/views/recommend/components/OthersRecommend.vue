<template>
  <div class="others-recommend" v-for="item in list">
    <a href="/tls/open/web/line/reply/detail?replyId={{item.replyId}}">
      <div class="already-adopt" v-if="item.status === 'accept'">
        <img src="/static/images/icon_yicaina2x.png" alt="已采纳" width="64"
             height="64"/>
      </div>
      <div class="author">
        <img :src="item.avatar"
             alt="{{item.nickname}}" width="20" height="20"/>
        <span class="name">{{item.nickname}}<em>推荐</em></span>
      </div>
      <ol class="attractions"
          v-if="item.rcmdPoiList && item.rcmdPoiList.length > 0">
        <li v-for=" replyNode in item.rcmdPoiList">{{$index + 1}}. {{replyNode.name}}</li>
      </ol>
      <div class="detail-info">
        <p class="tips">
          {{item.remark}}
        </p>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['list']
  };
</script>

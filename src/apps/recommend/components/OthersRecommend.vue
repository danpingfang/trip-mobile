<template>
  <div class="others-recommend" v-for="item in list">
    <a href="/tls/inner/web/line/reply/detail?replyId={{reply.id}}">
      <div class="already-adopt" v-if="item.status === 'accept'">
        <img src="/static/images/icon_yicaina2x.png" alt="已采纳" width="64" height="64"/>
      </div>
      <div class="author">
        <img :src="item.user.avatar"
             alt="{{item.user.nickname}}" width="20" height="20"/>
        <span class="name">{{item.user.nickname}}<em>推荐</em></span>
      </div>
      <ol class="attractions" v-if="item.replyNodes.poiName != ''">
        <li v-for="replyNode in item.replyNodes">{{replyNode.poiName}}</li>
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

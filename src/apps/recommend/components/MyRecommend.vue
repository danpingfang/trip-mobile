<template>
  <div class="my-recommend" v-for="item in list">
    <a
      href="/tls/inner/web/line/reply/detail?replyId={{item.id}}&&redirectUrl={{redirectUrl}}">
      <div class="already-adopt" v-if="item.status === 'accept'">
        <img src="/static/images/icon_yicaina2x.png" alt="已采纳" width="64"
             height="64"/>
      </div>
      <ol class="attractions"
          v-if="item.replyNodes && item.replyNodes.length > 0">
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
    props: ['list', 'redirectUrl']
  };
</script>

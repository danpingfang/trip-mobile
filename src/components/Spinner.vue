<template>
  <div class="spinner" v-if="show">数据加载中...</div>
</template>

<style lang="css">
  .spinner {
    width: 130px;
    height: 32px;
    margin: 20px auto;
    padding-left: 42px;
    line-height: 32px;
    background: url(/static/images/spinner-medium-2x.gif) no-repeat 0 0;
    background-size: 32px 32px;
    color: #999;
  }
</style>

<script>
  export default {
    props: ['show']
  };
</script>

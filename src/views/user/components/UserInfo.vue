<template>
  <div class="user-info">
    <avatar :user="user" :styles="{classNames:'sss'}"></avatar>
    <div class="user-content">
      <div class="user-name">{{user.name}}</div>
      <div class="user-summary">{{user.slogan}}</div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../styles/_UserInfo.scss";
</style>

<script>
  import Avatar from './Avatar';

  export default {
    props: ['user'],
    components: {
      Avatar
    }
  };
</script>

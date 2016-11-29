<template>
  <ul class="list">
    <li class="list-item" v-for="item in list">
      <span class="title">{{item.title}}</span>
      <span class="content">{{item.content}}</span>
    </li>
  </ul>
</template>

<style lang="scss">
  @import "./styles/_List.scss";
</style>

<script>
  export default {
    props: ['list']
  };
</script>

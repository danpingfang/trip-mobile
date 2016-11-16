<template>
  <ul class="line-place-list">
    <li class="line-place-item" v-for="place in list">{{place.targetName}}</li>
  </ul>
</template>

<script>
  export default {
    props: ['list']
  };
</script>

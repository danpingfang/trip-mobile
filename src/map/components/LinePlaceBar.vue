<template>
  <div class="line-place-bar">
    <line-place-list :current-index="currentIndex" :list="linePlaceList"></line-place-list>
  </div>
</template>

<script>
  import LinePlaceList from './LinePlaceList';

  export default {
    props: ['currentIndex', 'linePlaceList'],
    data() {
      return {
        list: []
      };
    },
    components: {
      LinePlaceList
    }
  };
</script>

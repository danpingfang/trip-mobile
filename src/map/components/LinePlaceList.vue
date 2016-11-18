<template>
  <ul class="line-place-list" v-if="list.length > 0">
    <li class="line-place-item {{currentIndex === $index ? 'active' : ''}}"
        v-for="place in list"
        @touchend="changeLinePlace(place, $index)">{{place.targetName}}
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['currentIndex', 'list'],
    methods: {
      changeLinePlace(place, index) {
        this.currentIndex = index;
        this.$dispatch('onChangeLinePlace', place);
      }
    }
  };
</script>

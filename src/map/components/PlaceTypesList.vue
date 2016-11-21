<template>
  <ul class="place-types-list">
    <li class="place-types-item {{ selectedIndex === $index ? 'active' : ''}}"
        v-for="item in list"
        @touchend="handleTypesClick(item, $index)"><i
      class="icon icon-types-{{item.type}}"></i>{{item.name}}
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['selectedIndex', 'list'],
    methods: {
      handleTypesClick(item, index) {
        this.selectedIndex = index;
        this.$dispatch('onTypesClick', item);
      }
    }
  };
</script>

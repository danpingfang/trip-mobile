<template>
  <div class="empty-container" v-if="show">
    <i class="icon icon-blank"></i>
    <span class="empty-text">{{ text }}</span>
  </div>
</template>

<script>
  export default {
    props: ['show', 'text']
  };
</script>

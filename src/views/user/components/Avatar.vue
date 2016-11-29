<template>
  <div class="avatar" :style="{backgroundImage: `url(${user.avatar})`}"></div>
</template>

<script>
  export default {
    props: ['user', 'styles']
  };
</script>

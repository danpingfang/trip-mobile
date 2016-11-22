<template>
  <div class="friend-list">
    <div class="recommend-head" v-for="item in lists">
      <div class="friends-photo">
        <img class="photo" :src="item.user.avatar"
             alt="{{item.user.nickname}}" width="40" height="40">
      </div>
      <div class="recommend-title">
        <p class="name">{{item.user.nickname}}</p>
        <p class="position">推荐地点：
          <em v-for="replyNode in item.replyNodes">
          {{replyNode}}
          </em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  const lists = window.jsConfig.friendList.list;
  export default {
    data() {
      return {
        lists
      };
    }
  };
</script>
<template>
  <li class="routes-container" v-for="item in list">
    <a href="/tls/open/web/line/share?lineId={{line.lineId}}">
      <div class="routes-cover">
        <p class="routes-title">{{item.title}}</p>
        <p class="routes-attractions" v-for="passDestination in item.passDestinations">
          {{passDestination}}<em v-if="{{velocityCount}} != {{item.passDestinations.size()">／</em>>
        </p>
      </div>
      <div class="extra-info">
        <div class="important-information">
          <span class="evaluate-days">预计天数：{{item.dayCount}}日游</span>
          <span class="fit-month">适合月份：
            <em v-for="bestTime in item.bestTimes">{{bestTime}}</em>
          </span>
          <span class="evaluate-fee">预计费用：￥{{item.cost}}元</span>
        </div>
        <div class="tags" v-if="item.tags != ''">
          <span class="tag-item" v-for="tag in item.tags">{{tag}}</span>
        </div>
        <div class="author">
          <img :src="item.createUser.avatar"
               alt="{{item.createUser.nickname}}" width="14" height="14"/>
          <span class="name-time">{{item.createUser.nickname}} / {{item.createTime}}</span>
        </div>
      </div>
    </a>
    <div class="line-space"></div>
  </li>
</template>

<script>
  export default {
    props: ['list']
  };
</script>

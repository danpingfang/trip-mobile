<template>
  <div class="head">
    <p>{{line.title}}</p>
  </div>
  <div class="relative-person" v-if="friendRcmdCount != 0">
    <p>有{{recommendFriendCount}}个用户推荐了{{recommendLineCount}}点</p>
    <a href="/tls/inner/web/line/rcmd/replys?lineId={{lineId}}">
      <ul class="photo-list">
        <li class="photo" v-for="friend in recommendFriendList.list">
          <img :src="friend.avatar"
               alt="{{friend.nickname}}" width="42" height="42"/>
        </li>
      </ul>
    </a>
  </div>
  <div class="line-space"></div>
  <div class="plan">
    <p class="title">{{line.inviteNote}}</p>
    <div class="important-information">
      <span class="evaluate-days">预计天数: {{line.dayCount}}</span>
      <span class="evaluate-fee">预计费用：￥{{line.cost}}/人</span>
    </div>
    <toggle-more :content="line.remark" max-height="44"></toggle-more>
  </div>
  <a href=""></a>
  <div class="position-tags position---tags">
    <span class="tag" v-for="line in lineList">
      {{line.targetName}}
    </span>
  </div>
  <div class="line-space"></div>
  <div class="recommend-container" v-infinite-scroll="loadMore()"
       infinite-scroll-disabled="busy" infinite-scroll-distance="200">
    <channel-nav :nav-list="navList" :current-index="0"></channel-nav>
    <div id="my-recommend-list" class="animated" v-show="currentIndex === 0"
         transition="fade"
         v-if="mine.list && mine.list.length > 0">
      <my-recommend :list="mine.list"
                    :redirect-url="currentUrl"></my-recommend>
      <load-end :is-end="mine.isEnd"></load-end>
      <empty :show="mine.isEmpty"></empty>
      <spinner :show="mine.isLoading"></spinner>
    </div>
    <div id="others-recommend-list" class="animated"
         v-show="currentIndex === (!isLogin ? 0 : 1)"
         transition="fade"
         v-if="other.list && other.list.length > 0">
      <others-recommend :list="other.list"></others-recommend>
      <load-end :is-end="other.isEnd"></load-end>
      <empty :show="other.isEmpty"></empty>
      <spinner :show="other.isLoading"></spinner>
    </div>
  </div>
  <a
    href="/tls/inner/web/line/rcmd/add?redirectUrl={{currentUrl}}&lineId={{lineId}}">
    <div class="footer">
      <i class="icon icon-add"></i> 推荐你所去过的地方
    </div>
  </a>
</template>

<script>
  import $ from 'jquery';
  import config from '../../../config';
  import touchBrokenFix from '../../../common/touchBrokenFix';
  import Spinner from '../../../components/Spinner';
  import Empty from '../../../components/Empty';
  import LoadEnd from '../../../components/LoadEnd';
  import ChannelNav from '../components/ChannelNav';
  import MyRecommend from '../components/MyRecommend';
  import OthersRecommend from '../components/OthersRecommend';
  import ToggleMore from '../components/ToggleMore';

  const jsConfig = window.jsConfig;
  const myRecommendReplys =
    jsConfig.myRecommendReplys && jsConfig.myRecommendReplys.list || null;
  const otherRecommendReplys =
    jsConfig.otherRecommendReplys && jsConfig.otherRecommendReplys.list || null;
  const lineId = jsConfig.line.lineId;
  const isLogin = jsConfig.isLogin;
  const currentUrl = jsConfig.currentUrl;
  const navList = [
    {
      type: 'mine',
      name: '我推荐',
      url: `${config.authApiUrl}/line/my_reply_list?lineId=${lineId}`
    },
    {
      type: 'other',
      name: '别人推荐',
      url: `${config.apiUrl}/line/other_reply_list?lineId=${lineId}`
    }
  ];
  if (!isLogin) {
    navList.splice(0, 1);
  }

  export default {
    data() {
      return Object.assign({}, {
        emptyText: '没有数据哦～',
        endText: '没有更多了',
        lineId,
        currentUrl,
        busy: false,
        startIndex: 10,
        itemCount: 15,
        currentIndex: 0,
        currentType: isLogin ? 'mine' : 'other',
        mine: {
          list: myRecommendReplys,
          startIndex: jsConfig.myRecommendReplys
                        && jsConfig.myRecommendReplys.nextIndex,
          isEmpty: myRecommendReplys === 0,
          isEnd: false,
          isLoading: false
        },
        other: {
          list: otherRecommendReplys,
          startIndex: jsConfig.otherRecommendReplys
                        && jsConfig.otherRecommendReplys.nextIndex,
          isEmpty: otherRecommendReplys.length === 0,
          isEnd: false,
          isLoading: false
        },
        navList
      }, jsConfig);
    },
    components: {
      ChannelNav,
      MyRecommend,
      OthersRecommend,
      ToggleMore,
      Empty,
      LoadEnd,
      Spinner
    },
    events: {
      onActive(item, index) {
        this.busy = false;
        this.currentIndex = index;
        this.currentType = item.type;
      }
    },
    ready() {
      touchBrokenFix();
    },
    methods: {
      loadMore() {
        if (!this.busy) {
          this.busy = true;
          this.getRelyList();
        }
      },
      getStartIndex() {
        return this[this.currentType].startIndex;
      },
      getRelyList() {
        $.ajax({
          url: navList[this.currentIndex].url,
          dataType: 'json',
          data: Object.assign({}, config.mock, {
            startIndex: this.getStartIndex(),
            itemCount: self.itemCount
          }),
          xhrFields: {
            withCredentials: true
          }
        }).done((response) => {
          if (response.code === 0) {
            this.processData(response.data);
          }
        });
      },
      processData(data) {
        const type = this.currentType;
        const item = this[type];
        const nextIndex = data.nextIndex;
        const isLast = nextIndex === -1;
        if (nextIndex > 0) {
          item.list =
            (item.list || (item.list = [])).concat(data.list);
        }
        this.busy = isLast;
        item.loading = !isLast;
        item.isEnd = !item.isEmpty && isLast;
        item.startIndex = nextIndex;
      }
    }
  };
</script>

<template>
  <div class="head">
    <p>{{line.title}}</p>
  </div>
  <div class="relative-person" v-if="friendRcmdCount != 0">
    <p>有{{friendRcmdCount}}个朋友推荐了{{nodeCount}}点</p>
    <ul class="photo-list">
      <li class="photo" v-for="friend in friends.list">
        <a href="">
          <img :src="friend.avatar"
               alt="{{friend.nickname}}" width="42" height="42"/>
        </a>
      </li>
    </ul>
  </div>
  <div class="line-space"></div>
  <div class="plan">
    <p class="title">{{rcmd.remark}}</p>
    <div class="important-information">
      <span class="evaluate-days">预计天数: {{line.dayCount}}</span>
      <span class="evaluate-fee">预计费用：￥{{line.cost}}/人</span>
    </div>
    <toggle-more :content="line.remark" max-height="44"></toggle-more>
  </div>
  <div class="position-tags position---tags">
    <span class="tag" v-for="gether in lineGethers">
      {{gether.targetName}}
    </span>
  </div>

  <div class="line-space"></div>
  <div class="recommend-container">
    <channel-nav :nav-list="navList"></channel-nav>
    <div id="my-recommend-list" v-if="myRcmdReplys.list != ''">
      <my-recommend :list="myrecmmendList" :redirect-url="currentUrl"></my-recommend>
    </div>
    <div class="others-recommend" v-for="item in list">
      <others-recommend :list="othersrecommendList" :redirect-url="currentUrl"></others-recommend>
    </div>
    <empty :show="isEmpty" :text="emptyText"></empty>
    <load-end :is-end="isEnd" :text="endText"></load-end>
    <spinner :show="loading"></spinner>
  </div>
  <a href="">
    <div class="footer">
      <i class="icon icon-trash"></i> 推荐你所去过的地方
    </div>
  </a>
</template>

<script>
  import $ from 'jquery';
  import config from '../../config';
  import touchBrokenFix from '../../common/touchBrokenFix';
  import Spinner from '../../components/Spinner';
  import Empty from '../../components/Empty';
  import LoadEnd from '../../components/LoadEnd';
  import ChannelNav from './components/ChannelNav';
  import MyRecommend from './components/MyRecommend';
  import OthersRecommend from './components/OthersRecommend';
  import ToggleMore from './components/ToggleMore';

  const line = window.jsConfig.line;
  const currentUrl = window.jsConfig.currentUrl;

  export default {
    data() {
      return {
        currentUrl,
        line,
        currentItem: null,
        isEmpty: false,
        isEnd: false,
        emptyText: '没有数据哦～',
        endText: '没有更多了',
        loading: true,
        startIndex: 0,
        itemCount: 15,
        busy: false,
        currentType: 'my',
        navList: [
          {
            type: 'my',
            name: '我推荐',
            url: `${config.apiUrl}/line/my_reply_list?lineId=${line.lineId}`
          },
          {
            type: 'others',
            name: '别人推荐',
            url: `${config.apiUrl}/line/other_reply_list?lineId=${line.lineId}?`
          }
        ],
        myrecommendList: null,
        othersrecommendList: null
      };
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
      onActive(item) {
        this.myrecommendList = null;
        this.othersrecommendList = null;
        this.startIndex = 0;
        this.loading = true;
        this.isEmpty = false;
        this.isEnd = false;
        this.currentItem = item;
        this.getArtList();
      }
    },
    ready() {
      touchBrokenFix();
    },
    created() {
      this.currentItem = this.navList[0];
      this.getArtList();
    },
    methods: {
      loadMore() {
        this.busy = true;
        this.getArtList();
      },
      getArtList() {
        this.getData(this.currentItem.url, this.currentItem.type);
      },
      getData(url, type) {
        const self = this;
        this.busy = true;
        $.ajax({
          url,
          dataType: 'json',
          data: Object.assign({}, config.mock, {
            startIndex: self.startIndex,
            itemCount: self.itemCount
          }),
          xhrFields: {
            withCredentials: true
          }
        }).done((response) => {
          if (response.code === 0) {
            const data = response.data;
            const count = data.count;
            const isLast = count < self.itemCount;
            if (count > 0) {
              this.setData(data, type);
            }
            if (type === 'my' || type === 'others') {
              self.busy = isLast;
              self.loading = !isLast;
              self.isEmpty = self.startIndex === 0 && count === 0;
              self.isEnd = !self.isEmpty && isLast;
              self.startIndex = data.nextIndex;
            }
          }
        });
      },
      setData(data, type) {
        let currentType = this.currentType;
        if (type) {
          currentType = type;
        }
        if (currentType === 'my') {
          this.myrecommendList =
          (this.myrecommendList || (this.myrecommendList = [])).concat(data.list);
        } else if (currentType === 'others') {
          this.othersrecommendList =
          (this.othersrecommendList || (this.othersrecommendList = [])).
          concat(data.list);
        }
      }
    }
  };
</script>

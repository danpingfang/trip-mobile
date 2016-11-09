<template>
  <div class="head">
    <p>杭州6日游</p>
  </div>
  <div class="relative-person">
    <p>67865位去过 (关联人物66位）</p>
    <ul class="photo-list">
      <li class="photo">
        <a href="">
          <img src="" alt="" width="42" height="42"/>
        </a>
      </li>
      <li class="photo">
        <a href="">
          <img src="" alt="" width="42" height="42"/>
        </a>
      </li>
      <li class="photo">
        <a href="">
          <img src="" alt="" width="42" height="42"/>
        </a>
      </li>
      <li class="photo">
        <a href="">
          <img src="" alt="" width="42" height="42"/>
        </a>
      </li>
    </ul>
  </div>
  <div class="line-space"></div>
  <div class="plan">
    <p class="title">我最近准备去xxxx，快来帮我推荐地点吧!</p>
    <div class="important-information">
      <span class="evaluate-days">预计天数: 6日游</span>
      <span class="evaluate-fee">预计费用：￥6000/人</span>
    </div>
    <toggle-more :content="user.summary" max-height="44"></toggle-more>
  </div>
  <div class="position-tags position---tags">
    <span class="tag">杭州</span>
    <span class="tag">苏州</span>
    <span class="tag">山海</span>
    <span class="tag">黑龙江</span>
  </div>
  <div class="line-space"></div>
  <div class="recommend-container">
    <ul class="recommend-switcher">
      <li class="selected">我推荐</li>
      <li >别人推荐</li>
    </ul>
    <div id="my-recommend-list" class="is-selected">
      <my-recommend :list="qaList" :redirect-url="currentUrl"></my-recommend>
    </div>
    <div id="others-recommend-list">
      <others-recommend :list="qaList" :redirect-url="currentUrl"></others-recommend>
    </div>
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
  import messageTip from '../../common/messageTip';
  import touchBrokenFix from '../../common/touchBrokenFix';
  import Spinner from '../../components/Spinner';
  import Empty from '../../components/Empty';
  import LoadEnd from '../../components/LoadEnd';
  import ChannelNav from '/components/ChannelNav';
  import MyRecommend from '/components/MyRecommend';
  import OthersRecommend from '/components/OthersRecommend';
  import ToggleMore from '/components/ToggleMore';

  const user = window.jsConfig.user;
  const currentUrl = window.jsConfig.currentUrl;

  export default {
    data() {
      return {
        currentUrl,
        user,
        currentItem: null,
        isEmpty: false,
        isEnd: false,
        emptyText: '没有数据哦～',
        endText: '没有更多了',
        loading: true,
        startIndex: 0,
        itemCount: 20,
        busy: false,
        currentType: 'my',
        navList: [
          {
            type: 'my',
            name: '我推荐',
            url: `${config.apiUrl}/user/whose_article?userId=${user.userId}`
          },
          {
            type: 'others',
            name: '别人推荐',
            url: `${config.apiUrl}/question/list_whose_answer` +
            `?userId=${user.userId}`
          }
        ],
        MyRecommend: null,
        OthersRecommend: null
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
        this.MyRecommend = null;
        this.OthersRecommend = null;
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
          this.MyRecommend =
              (this.MyRecommend || (this.MyRecommend = [])).concat(data.list);
        } else if (currentType === 'others') {
          this.OthersRecommend =
              (this.OthersRecommend || (this.OthersRecommend = [])).concat(data.list);
        }
      }
    }
  };
</script>
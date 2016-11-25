<template>
  <div class="recommend-list">
    <div class="recommend-container" v-infinite-scroll="loadMore()"
         infinite-scroll-disabled="busy" infinite-scroll-distance="200">
      <div class="recommend-head">
        <h2 class="recommend-title">我推荐</h2>
      </div>
      <div id="my-recommend-list" class="animated"
           v-if="myRecommendList.length > 0">
        <my-recommend :list="myRecommendList"
                      :redirect-url="currentUrl"></my-recommend>
      </div>
      <div class="recommend-head">
        <h2 class="recommend-title">别人推荐</h2>
      </div>
      <div id="others-recommend-list" v-if="otherRecommendList.length > 0">
        <others-recommend :list="otherRecommendList"></others-recommend>
        <load-end :is-end="isEnd" :text="endText"></load-end>
        <empty :show="isEmpty" :text="emptyText"></empty>
        <spinner :show="isLoading"></spinner>
      </div>
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
  import Spinner from '../../../components/Spinner';
  import Empty from '../../../components/Empty';
  import LoadEnd from '../../../components/LoadEnd';
  import MyRecommend from '../components/MyRecommend';
  import OthersRecommend from '../components/OthersRecommend';

  const jsConfig = window.jsConfig;
  const myRecommendList =
    jsConfig.myRecommendReplys && jsConfig.myRecommendReplys.list || null;
  const otherRecommendList =
    jsConfig.otherRecommendReplys && jsConfig.otherRecommendReplys.list || null;
  const lineId = jsConfig.line.lineId;
  const currentUrl = jsConfig.currentUrl;
  const isEmpty = !otherRecommendList;

  export default {
    data() {
      return Object.assign({}, {
        emptyText: '没有数据哦～',
        endText: '没有更多了',
        lineId,
        currentUrl,
        myRecommendList,
        otherRecommendList,
        busy: false,
        loading: false,
        isEnd: false,
        isEmpty,
        startIndex: 10,
        itemCount: 15
      }, jsConfig);
    },
    components: {
      MyRecommend,
      OthersRecommend,
      Empty,
      LoadEnd,
      Spinner
    },
    methods: {
      loadMore() {
        if (!this.busy) {
          this.busy = true;
          this.getOtherRelyList();
        }
      },
      getOtherRelyList() {
        $.ajax({
          url: `${config.apiUrl}/line/other_reply_list?lineId=${lineId}`,
          dataType: 'json',
          data: Object.assign({}, config.mock, {
            startIndex: this.startIndex,
            itemCount: this.itemCount
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
        const nextIndex = data.nextIndex;
        const isLast = nextIndex === -1;
        if (nextIndex > 0) {
          this.otherRecommendList = (this.otherRecommendList ||
          (this.otherRecommendList = [])).concat(data.list);
        }
        this.busy = isLast;
        this.loading = !isLast;
        this.isEnd = isLast;
        this.startIndex = nextIndex;
      }
    }
  };
</script>

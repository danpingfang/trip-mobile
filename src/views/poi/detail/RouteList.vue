<template>
  <div class="routes" v-if="data">
    <p>{{data.lineCount}}篇线路提到{{poiname}}</p>
    <ul class="routes-list" v-if="data.lineCount && data.lineCount !== 0"
        v-infinite-scroll="loadMore()"
        infinite-scroll-disabled="busy" infinite-scroll-distance="200">
      <li class="routes-container" v-for="list in data.lines.list">
        <a href="">
          <div class="routes-cover cover-container">
            <div class="cover-content">
              <p class="routes-title">{{list.title}}</p>
              <p class="routes-attractions"
                 v-for="passDestination in list.passDestinations">
                {{passDestination.join(' / ')}}
              </p>
            </div>
          </div>
          <div class="extra-info">
            <div class="important-information">
              <span class="evaluate-days">预计天数：{{list.dayCount}}日游</span>
              <span class="fit-month">适合月份：
                <em v-for="bestTime in list.bestTimes">{{bestTime}}</em>
              </span>
              <span class="evaluate-fee">预计费用：￥{{list.cost}}元</span>
            </div>
            <div class="tags" v-if="list.tags !== ''">
              <span class="tag-item" v-for="tag in list.tags">{{tag}}</span>
            </div>
            <div class="author">
              <img :src="list.createUser.avatar"
                   alt="{{list.createUser.nickname}}" width="14" height="14"/>
              <span class="name-time">{{list.createUser.nickname}}/{{list.createTime}}</span>
            </div>
          </div>
        </a>
        <div class="line-space"></div>
      </li>
    </ul>
  </div>
  <spinner :show="loading"></spinner>
  <empty :show="isEmpty && !loading" :text="emptyText"></empty>
  <load-end :is-end="isEnd" :text="endText"></load-end>
</template>

<script>
  import $ from 'jquery';
  import config from '../../../config';
  import Spinner from '../../../components/Spinner';
  import Empty from '../../../components/Empty';
  import LoadEnd from '../../../components/LoadEnd';

  const jsConfig = window.jsConfig;
  const poiName = jsConfig.poiName;
  const poiId = jsConfig.poiId;
  const poiGroup = jsConfig.poiGroup;
  const source = jsConfig.source;
  const poiType = jsConfig.poiType;

  export default {
    data() {
      return {
        poiName,
        data: null,
        currentItem: null,
        isEmpty: false,
        isEnd: false,
        emptyText: '没有数据哦～',
        endText: '没有更多了',
        loading: true,
        startIndex: 0,
        itemCount: 10,
        busy: false
      };
    },
    components: {
      Empty,
      LoadEnd,
      Spinner
    },
    created() {
      this.getLineList();
    },
    methods: {
      getLineList() {
        $.ajax({
          url: `${config.apiUrl}/line/poi_line`,
          dataType: 'json',
          data: Object.assign({}, config.mock, {
            startIndex: this.startIndex,
            itemCount: this.itemCount,
            poiId,
            poiGroup,
            source,
            poiType
          })
        }).done((response) => {
          const data = response.data;
          const nextIndex = data.lines.nextIndex;
          console.log(nextIndex);
          const isLast = nextIndex === -1;
          if (response.code === 0) {
            this.data = data;
          }
          this.busy = isLast;
          this.loading = false;
          this.isEnd = !this.isEmpty && isLast;
          this.startIndex = nextIndex;
        });
      }
    }
  };
</script>

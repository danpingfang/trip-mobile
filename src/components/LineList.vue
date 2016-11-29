<template>
  <div class="line-list-container" v-infinite-scroll="loadMore()"
       infinite-scroll-disabled="busy" infinite-scroll-distance="200">
    <ul class="routes-list">
      <li class="routes-container" v-for="item in list">
        <a href="/tls/open/web/line/detail?lineId={{item.lineId}}">
          <div class="routes-cover cover-container"
               :style="{backgroundImage: `url(${item.coverImageUrl})`}">
            <div class="cover-content">
              <p class="routes-title">{{item.title}}</p>
              <p class="routes-attractions">{{item.passDestinations.join(' /
                ')}}</p>
            </div>
            <div class="cover-overlay"></div>
          </div>
          <div class="extra-info">
            <div class="important-information">{{item.remark}}</div>
            <div class="author">
              <img :src="item.createUser.avatar"
                   alt="{{item.createUser.nickname}}" width="14" height="14"/>
              <span class="name-time">{{item.createUser.nickname}}/{{item.createTime}}</span>
            </div>
          </div>
        </a>
        <div class="ui-space ui-space--gray"></div>
      </li>
    </ul>
    <spinner :show="loading"></spinner>
    <empty :show="isEmpty && !loading" :text="emptyText"></empty>
    <load-end :is-end="isEnd" :text="endText"></load-end>
  </div>
</template>

<style lang="scss">
  @import "../components/styles/_LineList.scss";
</style>

<script>
  import $ from 'jquery';
  import config from '../../config';
  import messageTip from '../common/messageTip';
  import Spinner from '../components/Spinner';
  import Empty from '../components/Empty';
  import LoadEnd from '../components/LoadEnd';

  export default {
    props: ['apiUrl'],
    data() {
      return {
        list: [],
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
    methods: {
      loadMore() {
        if (!this.busy) {
          this.getLineList();
        }
      },
      getLineList() {
        $.ajax({
          url: this.apiUrl,
          dataType: 'json',
          data: Object.assign({}, config.mock, {
            startIndex: this.startIndex,
            itemCount: this.itemCount
          }),
          xhrFields: {
            withCredentials: true
          }
        }).done((response) => {
          const code = response.code;
          if (code === 0) {
            const data = response.data;
            const nextIndex = data.nextIndex;
            this.list = this.list.concat(data.list);
            const listLength = this.list.length;
            const isLast = nextIndex === -1 || listLength < this.itemCount;
            this.isEmpty = listLength === 0;
            this.busy = isLast;
            this.isEnd = !this.isEmpty && isLast;
            this.startIndex = nextIndex;
          } else if (code === -99) {
            messageTip.show('获取数据失败');
            this.busy = true;
          }
          this.loading = false;
        });
      }
    }
  };
</script>

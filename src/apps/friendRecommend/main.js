import Vue from 'vue';
import $ from 'jquery';
import config from '../../config';
import FriendList from './FriendList';
import VueInfiniteScroll from 'vue-infinite-scroll';
import Spinner from '../../components/Spinner';
import LoadEnd from '../../components/LoadEnd';
import Empty from '../../components/Empty';

Vue.use(VueInfiniteScroll);

require('./style.scss');

new Vue({
  el: 'body',
  data() {
    return {
      isEmpty: false,
      isEnd: false,
      loading: true,
      endText: '没有更多了～',
      emptyText: '没有数据哦～',
      startIndex: 20,
      itemCount: 20,
      busy: false,
      list: null
    };
  },
  components: {
    LoadEnd,
    Spinner,
    Empty,
    FriendList
  },
  methods: {
    loadMore() {
      this.getFriendList();
    },
    getFriendList() {
      const self = this;
      this.busy = true;
      $.ajax({
        url: `${config.apiUrl}/question/search`,
        dataType: 'json',
        data: Object.assign(config.mock, {
          startIndex: this.startIndex,
          itemCount: this.itemCount
        }),
        xhrFields: {
          withCredentials: true
        }
      }).done((response) => {
        const data = response.data;
        const count = data.count;
        const isEnd = count < self.itemCount;
        if (response.code === 0) {
          if (count > 0) {
            self.list = (self.list ||
            (self.list = [])).concat(data.list);
          }
          self.busy = isEnd;
          self.loading = !isEnd;
          self.isEnd = isEnd;
          self.startIndex = data.nextIndex;
        }
      });
    }
  }
});

<template>
  <div class="recommend-container {{showPlace ? 'hidden-page' : ''}}">
    <div class="recommend-form">
      <textarea class="description" rows=9 placeholder="补充说明..."
                v-model="description"></textarea>
      <div class="recommend-place" @touchend="onRecommendPlace">
        <span class="place-name">
          {{ recommendNames.length > 0 ? recommendNames.join('、') : '推荐地点' }}
        </span>
        <span class="arrow">
          <i class="icon icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <div class="refer-recommend" v-if="otherRecommendReplys">
      <p class="title">看看其他人如何推荐的</p>
      <a href="/tls/open/web/line/reply/detail?replyId={{list.replyId}}"
         class="others-recommend" v-for="list in otherRecommendReplys.list.slice(0, 3)">
        <div class="author">
          <span class="name">案例{{ text | getText }}<em>推荐</em></span>
        </div>
        <ol class="attractions" v-if="list.rcmdPoiList.length > 0">
          <li v-for="replyNode in list.rcmdPoiList">{{$index + 1}}.
            {{replyNode.name}}
          </li>
        </ol>
        <div class="detail-info">
          <p class="tips">
            {{list.remark}}
          </p>
        </div>
      </a>
    </div>
    <button @touchend.prevent.stop="onSubmit"
            class="button button-full button-fixed button-fixed--bottom {{ description ? ' button-confirm' : 'button-disable' }}"
            type="button">发布
    </button>
    <place-search :show.sync="showPlace"
                  :recommend-list="myRecommendList"></place-search>
  </div>
</template>

<script>
  import $ from 'jquery';
  import config from '../../../config';
  import redirectUrl from '../../../utils/redirectUrl';
  import messageTip from '../../../common/messageTip';
  import touchBrokenFix from '../../../common/touchBrokenFix';
  import PlaceSearch from '../../../map/components/PlaceSearch';

  const jsConfig = window.jsConfig;
  const lineId = jsConfig.lineId;
  const myRecommendReplys = jsConfig.myRecommendReplys || {};
  const otherRecommendReplys = jsConfig.otherRecommendReplys;
  const recommendNames = [];
  let myRecommendList = myRecommendReplys.rcmdPoiList;
  if (myRecommendList) {
    myRecommendList = myRecommendList.map((item) => {
      item.isRecommend = true;
      recommendNames.push(item.name);
      return item;
    });
  }
  export default {
    data() {
      return {
        showPlace: false,
        description: myRecommendReplys.remark,
        myRecommendReplys,
        otherRecommendReplys,
        myRecommendList,
        recommendNames
      };
    },
    components: {
      PlaceSearch
    },
    events: {
      onAdd(placeList) {
        const names = [];
        const list = [];
        for (let i = 0; i < placeList.length; i++) {
          const place = placeList[i];
          const poiName = place.name;
          names.push(poiName);
          list.push({
            poiId: place.poiId,
            targetPoiId: place.targetPoiId,
            nodeOrder: i + 1,
            poiName,
            poiLat: place.geoCoordinate.lat,
            poiLng: place.geoCoordinate.lng,
            poiAddress: place.address,
            poiSource: place.source,
            poiType: place.poiType,
            poiGroup: place.poiGroup
          });
        }
        this.recommendNames = names;
        this.recommendList = list;
      }
    },
    filters: {
      getText() {
        return ['一', '二', '三'][this.$index];
      }
    },
    ready() {
      touchBrokenFix();
      window.addEventListener('popstate', () => {
        history.replaceState(null, null, location.href);
        this.showPlace = false;
      }, false);
    },
    methods: {
      onRecommendPlace() {
        this.showPlace = true;
        history.pushState(null, null, null);
      },
      onSubmit() {
        const recommendList = this.recommendList;
        const description = this.description;
        if (description && description !== '') {
          $.ajax({
            type: 'post',
            url: `${config.authApiUrl}/line/reply`,
            data: {
              lineId,
              remark: this.description,
              nodes: JSON.stringify(recommendList)
            }
          }).done((response) => {
            if (response.code === 0) {
              messageTip.show('推荐成功～', () => {
                redirectUrl();
              });
            }
          });
        } else {
          messageTip.show('补充说明不能为空');
          return false;
        }
        return false;
      }
    }
  };
</script>

<template>
  <div class="recommend-container">
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
    <div class="refer-recommend">
      <p class="title">看看其他人如何推荐的</p>
      <div class="others-recommend" v-for="list in otherRcmdReplys.list">
        <div class="author">
          <span class="name">案例一<em>推荐</em></span>
        </div>
        <ol class="attractions" v-if="list.replyNodes.poiName != ''">
          <li v-for="replyNode in list.replyNodes">{{replyNode.poiName}}</li>
        </ol>
        <div class="detail-info">
          <p class="tips">
           {{list.remark}}
          </p>
        </div>
      </div>
    </div>
    <button @touchend.prevent.stop="onSubmit"
            class="button button-full button-fixed button-fixed--bottom {{ description ? ' button-confirm' : 'button-disable' }}"
            type="button">发布
    </button>
    <place-search :show.sync="showPlace"></place-search>
  </div>
</template>

<script>
  import config from '../../config';
  import $ from 'jquery';
  import messageTip from '../../common/messageTip';
  import PlaceSearch from '../../map/components/PlaceSearch';

  const lineId = window.jsConfig.lineId;

  export default {
    data() {
      return {
        showPlace: false,
        description: null,
        recommendNames: []
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
    methods: {
      onRecommendPlace() {
        this.showPlace = true;
      },
      onSubmit() {
        const recommendList = this.recommendList;
        const description = this.description;
        if (description && description !== '') {
          $.ajax({
            type: 'post',
            url: `${config.authApiUrl}/line/rcmd/add`,
            data: {
              mockAccount: 15222918011,
              deviceId: 11,
              lineId,
              remark: this.description,
              nodes: JSON.stringify(recommendList)
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

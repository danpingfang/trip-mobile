<template>
  <form action="" @submit.prevent.stop="search"
        :class="['search-bar', 'phm', 'pvs', isFocus ? ' search-bar--focus': '']">
    <i class="search-bar-icon icon icon-search"></i>
    <input id="js-search-bar-input" class="search-bar-input" type="text"
           autocomplete="off" v-model="keyword" placeholder="{{ holderText }}"
           @touchend="onFocus">
    <button class="search-bar-button" type="button"
            v-if="keyword !== ''" @touchend.prevent.stop="search">
      确定
    </button>
    <button class="search-bar-button" type="button"
            v-if="isFocus && keyword === ''"
            @touchend.prevent.stop="onCancel">取消
    </button>
  </form>
  <overlay :show="showOverlay"></overlay>
</template>

<style lang="scss">
  @import "../styles/_SearchBar.scss";
</style>

<script>
  import $ from 'jquery';
  import config from '../../config';
  import Overlay from '../../components/Overlay';

  let lastKeyword = null;
  export default {
    data() {
      return {
        showOverlay: false,
        isFocus: false,
        keyword: '',
        holderText: '搜索添加景点、城市、餐饮、酒店等'
      };
    },
    components: {
      Overlay
    },
    methods: {
      search() {
        const self = this;
        const keyword = this.keyword;
        if (lastKeyword !== keyword) {
          $.ajax({
            url: `${config.apiUrl}/poi/keyword_search`,
            type: 'get',
            data: {
              country: 'cn',
              keyword
            },
            dataType: 'json',
            xhrFields: {
              withCredentials: true
            },
            beforeSend() {
              self.$dispatch('onSearchBeforeSend');
            }
          }).done((response) => {
            this.$dispatch('onSearch', response.data.list);
            lastKeyword = keyword;
          });
          this.onCancel();
        }
      },
      onFocus() {
        this.keyword = '';
        this.isFocus = true;
        this.showOverlay = true;
      },
      clear() {
        this.keyword = '';
      },
      onCancel() {
        this.isFocus = false;
        this.showOverlay = false;
        $('#js-search-bar-input').blur();
      }
    }
  };
</script>

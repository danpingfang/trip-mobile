<template>
  <form action="" @submit.prevent.stop="handleSubmit"
        :class="['search-bar', 'phm', 'pvs', isFocus ? ' search-bar--focus': '']">
    <i class="search-bar-icon icon icon-search"></i>
    <input id="js-search-bar-input" class="search-bar-input" type="text"
           autocomplete="off" v-model="keyword" placeholder="{{ holderText }}"
           @touchend="handleFocus">
    <button class="button search-bar-button" type="button"
            v-if="keyword !== ''" @touchend.prevent.stop="handleSubmit">
      确定
    </button>
    <button class="button search-bar-button" type="button"
            v-if="isFocus && keyword === ''"
            @touchend.prevent.stop="handleCancel">取消
    </button>
  </form>
  <overlay :show="show"></overlay>
</template>

<script>
  import $ from 'jquery';
  import Overlay from '../../../components/Overlay';

  export default {
    data() {
      return {
        show: false,
        keyword: '',
        isFocus: false,
        holderText: '搜索添加景点、城市、餐饮、酒店等'
      };
    },
    components: {
      Overlay
    },
    methods: {
      handleFocus() {
        this.isFocus = true;
        this.show = true;
      },
      handleSubmit() {
        this.$dispatch('onSubmit', this.keyword);
        this.keyword = '';
        this.isFocus = false;
        this.show = false;
      },
      handleCancel() {
        this.isFocus = false;
        this.show = false;
        $('#js-search-bar-input').blur();
      }
    }
  };
</script>

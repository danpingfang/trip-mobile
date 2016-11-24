<template>
  <div class="ui-text-more{{ isShort ? ' is-short' : '' }}">
    <p id="{{ mId }}" class="ui-text-content">{{ content }}</p>
    <button class="ui-text-button1" type="button" @touchend.prevent="onToggle"
            v-if="showButton">展开
    </button>
    <button class="ui-text-button2" type="button" @touchend.prevent="onToggle"
            v-if="showButton">收起
    </button>
  </div>
</template>

<style lang="css">
  .ui-text-content {
    margin-top: 10px;
    margin-bottom: 0;
    line-height: 22px;
    overflow: hidden;
    font-size: 13px;
  }

  .is-short .ui-text-content {
    max-height: 44px;
  }

  .ui-text-button1 {
    display: block;
    float: right;
    margin-top: 0;
    font-size: 13px;
    color: #a4a4a4;
  }

  .ui-text-button2 {
    display: none;
    float: right;
    margin-top: 0;
    font-size: 13px;
    color: #a4a4a4;
  }

  .is-short .ui-text-button1 {
    display: block;
  }

  .is-short .ui-text-button2 {
    display: none;
  }
</style>

<script>
  import $ from 'jquery';

  export default {
    props: ['content', 'maxHeight'],
    data() {
      return {
        mId: null,
        isShort: false,
        showButton: false
      };
    },
    created() {
      this.mId = `m-${new Date().getTime()}`;
    },
    ready() {
      const height = $(`#${this.mId}`).height();
      this.showButton = height > this.maxHeight;
      this.isShort = true;
    },
    methods: {
      onToggle() {
        this.isShort = !this.isShort;
      }
    }
  };
</script>



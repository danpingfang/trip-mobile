<template>
  <div class="dialog-guide" v-if="show">
    <div class="guide-container">
      <button class="button-guide-tip" type="button">{{ guideTip }}</button>
      <button class="button-guide-confirm" type="button"
              @touchend="onConfirm">{{ guideConfirmText }}
      </button>
      <button class="button-guide-cancel" type="button"
              @touchend="onCancel">{{ guideCancelText }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  @import "./styles/_DialogGuide.scss";
</style>

<script>
  export default {
    props: ['show', 'guideTip', 'guideConfirmText', 'guideCancelText'],
    methods: {
      onConfirm() {
        this.$dispatch('onConfirm');
        this.onCancel();
      },
      onCancel() {
        this.show = false;
      }
    }
  };
</script>

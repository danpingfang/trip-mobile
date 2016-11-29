<template>
  <div class="routes">
    <p>{{data.lineCount}}篇线路提到{{poiName}}</p>
    <line-list :api-url="apiUrl"></line-list>
  </div>
</template>

<style lang="scss">
  @import "./style.scss";
</style>

<script>
  import config from '../../../config';
  import LineList from '../../../components/LineList';

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
        apiUrl: `${config.authApiUrl}/line/my_line_list?poiId=${poiId}&poiName=
          ${poiName}&poiGroup=${poiGroup}&source=${source}&poiType=${poiType}`
      };
    },
    components: {
      LineList
    }
  };
</script>

<template>
  <div class="others-recommend">
    <div class="author">
      <img src="" alt="" width="20" height="20"/>
      <span class="name">Kevin Hunt<em>推荐</em></span>
    </div>
    <ol class="attractions">
      <li>1.断桥残雪 </li>
      <li>2.花港观鱼 </li>
      <li>3.西溪湿地公园 </li>
    </ol>
    <div class="detail-info">
      <p class="guide">当地人：李长云 13566879687</p>
      <p class="tips">
        补充信息：关于日本，有人偏爱北海道的浪漫，
        有人迷恋九州的乡野风，还有人沉醉于东京的时尚潮流与二次元，而我却偏爱关西。
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list']
  };
</script>

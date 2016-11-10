<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img width="100%" height="100%" src="" alt="">
      <div class="location">
        <i class="icon icon-trash"></i> 吴山广场
      </div>
    </div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    <div class="swiper-slide">Slide 4</div>
    <div class="swiper-slide">Slide 5</div>
    <div class="swiper-slide">Slide 6</div>
    <div class="swiper-slide">Slide 7</div>
    <div class="swiper-slide">Slide 8</div>
    <div class="swiper-slide">Slide 9</div>
    <div class="swiper-slide">Slide 10</div>
  </div>
  <div class="swiper-pagination"></div>
</div>
<script>
  import Vue from 'vue';
  import Swiper from 'swiper';

  window.vm = new Vue({
    el: '#app',
    ready() {
    new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop: true
    });
    }
  });
</script>
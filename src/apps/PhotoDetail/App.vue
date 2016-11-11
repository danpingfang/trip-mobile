<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img  src="../../images/fu.png" alt="">
        <div class="location">
          <i class="icon icon-location"></i> 吴山广场
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
</template>

<script>
  import Swiper from 'swiper';

  export default {
    ready() {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true
      });
    }
  };
</script>
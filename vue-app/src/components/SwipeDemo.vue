<template>
  <div>
    <div class="swiper-container" :id="id">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "swipe",
  props: ["id", "options"],
  mounted() {
    let mySwiper = new Swiper("#" + this.id, this.options);
  },
  updated() {
    let mySwiper = new Swiper("#" + this.id, this.options);
  }
};
</script>

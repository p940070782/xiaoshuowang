<template>
  <div id="guide">
    <SwipeDemo id="swipeone" :options="swiperOptions">
      <swipeItem v-for="(img,i) in imgs" :key="i">
        <img :src="img" alt class="g-img" @click="gotoHome(i)" />
      </swipeItem>
    </SwipeDemo>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        require("@/assets/images/shuqi1.jpg"),
        require("@/assets/images/shuqi2.jpg"),
        require("@/assets/images/shuqi3.jpg"),
        require("@/assets/images/shuqi4.jpg"),
        require("@/assets/images/shuqi5.jpg")
      ],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  methods: {
    gotoHome(idx) {
      if (idx == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    }
  },
  mounted() {
    if (localStorage.pcount) {
      localStorage.pcount++;
      if (localStorage.pcount > 3) {
        this.$router.push({ name: "home" });
      }
    } else {
      localStorage.pcount = 1;
    }
  }
};
</script>

<style scoped>
#guide,
#swipenone,
.g-img {
  width: 100%;
  height: 100%;
}
</style>
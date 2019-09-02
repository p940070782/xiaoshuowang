<template>
  <div id="returnHead">
    <van-sticky>
      <van-nav-bar
        :title="title"
        :left-text="show?'返回':''"
        :left-arrow="show"
        @click-left="onClickLeft"
      >
        <div slot="right">
          <van-icon name="wap-home" @click="goHome" />
          <van-icon v-if="searchShow" name="search" @click="goSearch" />
        </div>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script>
export default {
  props: ["title", "show"],
  data() {
    return {
      searchShow: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push({ name: "search" });
    },
    goHome() {
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    if (this.$route.name == "search") {
      this.searchShow = false;
    }
  }
};
</script>

<style>
#returnHead .van-nav-bar {
  position: relative;
  height: 0.92rem;
  line-height: 0.92rem;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #00c98d;
  color: aliceblue;
}
#returnHead .van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: aliceblue;
  font-weight: 500;
  font-size: 0.32rem;
}
#returnHead .van-nav-bar .van-icon {
  color: aliceblue;
  vertical-align: middle;
  font-size: 0.3rem;
}
#returnHead .van-nav-bar__text {
  display: inline-block;
  margin: 0 -16px;
  padding: 0 16px;
  color: aliceblue;
  vertical-align: middle;
}
</style>
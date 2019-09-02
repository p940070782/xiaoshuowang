<template>
  <div :id="id">
    <div v-for="(bk,i) in list" :key="i">
      <router-link :to="{name:'detail',params:{bookId:bk._id}}">
        <div class="common-bookele">
          <img class="img" :src="bk.iconUrl" :alt="bk.title" />
          <div class="content">
            <h3>{{bk.title}}</h3>
            <p>{{bk.author}}</p>
            <p>{{bk.readCount}}人阅读 | {{bk.bookStatus==1.0?'已完结':"连载中"}}</p>
            <div v-html="bk.description" class="abstract"></div>
          </div>
        </div>
      </router-link>
    </div>
    <slot></slot>
    <div class="goBack" v-if="btnFlag" @click="backTop"></div>
  </div>
</template>

<script>
export default {
  props: ["list", "id"],
  data() {
    return {
      btnFlag: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  }
};
</script>

<style scoped>
.common-bookele {
  position: relative;
  background-color: #faf7f5;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  margin-bottom: 0.1rem;
  box-sizing: border-box;
}
.common-bookele img.img {
  width: 30%;
  height: 3rem;
  margin: 0 10px 0 0;
}
.common-bookele .content {
  width: 65%;
  height: 3rem;
}
.common-bookele h3 {
  font-size: 0.3rem;
  line-height: 0.3rem;
  height: 0.3rem;
  overflow: hidden;
  word-break: break-all;
  font-weight: normal;
  color: #1d2c33;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 2px;
}
.common-bookele .content > p {
  color: #aaa;
  line-height: 0.3rem;
  height: 0.3rem;
  overflow: hidden;
  font-size: 0.22rem;
}

.common-bookele div.abstract {
  padding-top: 4px;
  height: 2.1rem;
  line-height: 0.3rem;
  color: #aaa;
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.common-bookele div.abstract > p {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.goBack {
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-size: 0.5rem 0.5rem;
  background: rgba(0, 0, 0, 0.3) url("../assets/images/uptotop.png") center
    center no-repeat;
}
</style>
<template>
  <footer>
    <div v-for="(foot,i) in foots" :key="i">
      <router-link :to="{name:foot.name}">
        <i class="iconfont" v-html="foot.icon"></i>
        <span>{{foot.txt}}</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {
      foots: [
        { txt: "书架", path: "/index/book", name: "book", icon: "&#xe61d;" },
        { txt: "书城", path: "/index/home", name: "home", icon: "&#xe608;" },
        {
          txt: "分类",
          path: "/index/fenlei",
          name: "fenlei",
          icon: "&#xe602;"
        },
        { txt: "会员", path: "/index/member", name: "member", icon: "&#xe61a;" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  width: 100%;
  height: 0.9rem;
  left: 0;
  bottom: 0;
  background: #00C98D;
  display: flex !important;
  z-index: 100;
  border-top: 1px solid black;
  div {
    flex: 1;
    height: 0.9rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.06rem 0;
      text-align: center;
      font-family: "微软雅黑";
      color: aliceblue;
      position: relative;
      i {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.42rem !important;
      }
      span {
        width: 100%;
        height: 0.35rem;
        line-height: 0.35rem;
        font-size: 0.26rem;
      }
      .hot {
        position: absolute;
        top: 0;
        left: 60%;
        display: inline-block;
        width: 0.25rem;
        border-radius: 50%;
      }
    }
    .nav-active,
    .router-link-exact-active {
      color: #00C98D;
      border-color: aliceblue;
      background: aliceblue;
    }
  }
}
</style>
<template>
  <div id="fit">
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <div class="accounts">
      <p class="title">
        <span>账号设置</span>
      </p>
      <div class="pic" @click="layout">
        <img :src="this.touxiang" alt />
        <div class="i-title">
          <p class="c-title only-one">退出当前账号</p>
        </div>
        <div class="l-opera more-link">
          <img src="../assets/images/member5.png" />
        </div>
      </div>
    </div>
    <div class="accounts">
      <p class="title">
        <span>基本设置</span>
      </p>
      <div class="pic" @click="topage">
        <div class="i-title">
          <p class="c-title">消息推送</p>
          <span class="explain">可以关闭通知栏的消息提醒</span>
        </div>
        <div class="l-opera more-link">
          <img src="../assets/images/member5.png" />
        </div>
      </div>
      <div class="pic" @click="topage">
        <div class="i-title">
          <p class="c-title">自动购买设置</p>
          <span class="explain">可以取消书籍章节自动购买</span>
        </div>
        <div class="l-opera more-link">
          <img src="../assets/images/member5.png" />
        </div>
      </div>
      <div class="pic" @click="topage">
        <div class="i-title">
          <p class="c-title only-one">全局亮度</p>
        </div>
        <div class="l-opera more-link">
          <img src="../assets/images/member5.png" />
        </div>
      </div>
      <div class="pic">
        <div class="i-title">
          <p class="c-title">启动时打开最近阅读书</p>
          <span class="explain">开启后，应用启动默认打开最近阅读的书籍</span>
        </div>
        <div class="l-opera more-link">
          <van-switch v-model="checked" />
        </div>
      </div>
      <div class="pic">
        <div class="i-title">
          <p class="c-title">启用听书悬浮窗</p>
          <span class="explain">开启后，在播放时可通过悬浮窗回到听书页</span>
        </div>
        <div class="l-opera more-link">
          <van-switch v-model="checkouted" />
        </div>
      </div>
      <div class="pic" @click="topage">
        <div class="i-title">
          <p class="c-title only-one">好评支持一下</p>
        </div>
      </div>
      <div class="pic">
        <div class="i-title">
          <p class="c-title only-one">清除缓存</p>
        </div>
      </div>
    </div>
    <div class="accounts">
      <p class="title">
        <span>关于书旗小说</span>
      </p>
      <div class="pic" @click="topage">
        <div class="i-title">
          <p class="c-title only-one">版本更新</p>
        </div>
        <div class="l-opera more-link">当前已经是最新版本</div>
      </div>
      <div class="pic" @click="topage">
        <div class="i-title">
          <p class="c-title only-one">版本介绍</p>
        </div>
        <div class="l-opera more-link">
          <img src="../assets/images/member5.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      checked: false,
      checkouted: false
    };
  },
  computed: {
    ...mapState(["touxiang"])
  },
  methods: {
    topage(){
      this.$router.push({
        name:'common'
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    layout() {
      Dialog.confirm({
        title: "退出登录",
        message: "您确认要退出吗？"
      }).then(() => {
        sessionStorage.userInfo = "";
        this.$router.push({
          name: "login"
        });
      });
    }
  },
  mounted() {
    if (!sessionStorage.userInfo) {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style scoped>
#fit .van-nav-bar {
  position: relative;
  height: 0.92rem;
  line-height: 0.92rem;
  text-align: center;
  background-color: #00c98d;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: aliceblue;
}
#fit .van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: aliceblue;
  font-weight: 500;
  font-size: 0.32rem;
}
.van-nav-bar .van-icon {
  color: aliceblue;
  vertical-align: middle;
}
#fit .accounts {
  background-color: #fff;
  font-family: "楷体";
  margin-bottom: 0;
  box-sizing: border-box;
}
#fit .accounts .title {
  background-color: #eee;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  padding: 0 0.4rem;
  color: #afaeae;
  box-sizing: border-box;
}
.accounts .pic {
  padding: 0.2rem;
  height: 1.2rem;
  line-height: 0.8rem;
  box-sizing: border-box;
  border-bottom: 1px solid #dfdfdf;
}
.accounts .pic > img {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  display: block;
  float: left;
  margin-right: 0.3rem;
}

.accounts .pic .i-title {
  float: left;
  height: 0.8rem;
}
.accounts .pic .i-title .c-title {
  margin-top: -0.2rem;
  font-size: 0.3rem;
  height: 0.4rem;
}
.accounts .pic .i-title .only-one {
  font-size: 0.3rem;
  height: 0.8rem;
  margin-top: 0;
}
.accounts .pic .i-title .explain,
.accounts .l-opera {
  font-size: 0.24rem;
  color: #d3d3d3;
}
.accounts .l-opera {
  float: right;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-right: 0.3rem;
}
.accounts .l-opera > img {
  height: 0.22rem;
  display: inline-block;
}
</style>
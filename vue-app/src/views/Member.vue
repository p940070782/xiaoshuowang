<template>
  <div id="user_in">
    <Head></Head>
    <section class="m-acinfo">
      <img :src="touxiang" alt="上传头像" @click="uploadImg" class="touxiang" />
      <input type="file" @change="shangchuan" ref="upload" accept="img/*" class="hiddenInput" />
      <div class="userinfo">
        <h2>
          用户名：{{this.username}}
          <span class="lv">Lv 1</span>
        </h2>
        <h2></h2>
      </div>
    </section>
    <van-notice-bar :text="msg" left-icon="volume-o" />
    <div class="l-block">
      <a class="l-item syd" data-act-class="active">
        <div class="l-logo">
          <i class="wallet"></i>
        </div>
        <div class="l-info">
          <div class="l-name">我的余额</div>
          <div class="l-opera">0书豆</div>
        </div>
      </a>
      <a class="l-item sdcz" data-act-class="active">
        <div class="l-logo">
          <i class="bean"></i>
        </div>
        <div class="l-info">
          <div class="l-name">书豆充值</div>
          <div class="l-opera" lmk="bean" lmv="书豆充值" urltrue="true" lmurl="#">
            <button class="bs-button button-fill">充值</button>
          </div>
        </div>
      </a>
      <a class="l-item czlu">
        <div class="l-logo">
          <i class="clock"></i>
        </div>
        <div class="l-info">
          <div class="l-name">充值记录</div>
          <div class="l-opera more-link">
            <img src="../assets/images/member5.png" />
          </div>
        </div>
      </a>
      <a class="l-item">
        <div class="l-logo">
          <i class="ubook"></i>
        </div>
        <div class="l-info">
          <div class="l-name">消费记录</div>
          <div class="l-opera more-link">
            <img src="../assets/images/member5.png" />
          </div>
        </div>
      </a>
    </div>
    <div class="l-block next">
      <router-link class="l-item" :to="{name:'book'}">
        <div class="l-logo">
          <i class="shelf"></i>
          <!-- <img src="shelf" /> -->
        </div>
        <div class="l-info">
          <div class="l-name">我的书架</div>
          <div class="l-opera more-link">
            <img src="../assets/images/member5.png" />
          </div>
        </div>
      </router-link>
      <router-link class="l-item" :to="{name:'admin'}">
        <div class="l-logo">
          <i class="clocked"></i>
        </div>
        <div class="l-info">
          <div class="l-name">密码管理</div>
          <div class="l-opera more-link">
            <img src="../assets/images/member5.png" />
          </div>
        </div>
      </router-link>
      <router-link class="l-item lgt" :to="{name:'fit'}">
        <div class="l-logo">
          <i class="logout"></i>
          <!-- <img src="logout" /> -->
        </div>
        <div class="l-info">
          <div class="l-name">设置与帮助</div>
          <div class="l-opera more-link">
            <img src="../assets/images/member5.png" />
          </div>
        </div>
      </router-link>
    </div>
    <!-- <div>
      <van-button type="danger" size="large" @click="layout">退出登录</van-button>
    </div>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      msg: "会员读书日，全场限免，加入会员，享受无与伦比的小说之旅......",
      userInfo: JSON.parse(sessionStorage.userInfo)
    };
  },
  computed: {
    ...mapState(["userinfo", "touxiang"])
  },
  methods: {
    ...mapMutations(["changeTouxiang"]),
    layout() {
      sessionStorage.userInfo = "";
      this.$router.push({ name: "login" });
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    uploadImg() {
      this.$refs.upload.click();
    },
    shangchuan() {
      let file = this.$refs.upload.files[0];
      // 创建表单 form 对象；
      let data = new FormData();
      data.append("avatar", file);
      // 后台请求数据(头像);
      this.$axios({
        url: "/vue/uploadAvatar",
        method: "POST",
        data: data,
        contentType: false,
        processData: false
      }).then(res => {
        this.changeTouxiang(
          res.data.pic.replace(/public/, "http://123.56.160.88:1906")
        );
      });
    }
  },
  mounted() {
    if (sessionStorage.userInfo) {
      this.username = JSON.parse(sessionStorage.userInfo).username;
    } else {
      this.$router.push({ name: "login" });
    }
    if (this.username) {
      this.$axios
        .post("/vue/getAvatar", {
          username: this.username
        })
        .then(res => {
          if (!!res.data.type) {
            this.changeTouxiang(
              res.data.avatar.replace(/public/, "http://123.56.160.88:1906")
            );
          }
        });
    }
  }
};
</script>

<style scoped>
a {
  color: #333;
}
.hiddenInput {
  display: none;
}
.m-acinfo {
  height: 1.4rem;
  background-color: #fff;
  margin-bottom: 0.2rem;
  padding: 0.3rem;
}
.m-acinfo img {
  float: left;
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.3rem;
  border-radius: 50%;
}
.m-acinfo .userinfo h2 {
  margin: 0.12rem 0 0.16rem;
  font-size: 0.34rem;
  color: #626358;
  height: 0.48rem;
  line-height: 0.48rem;
  overflow: hidden;
}
.m-acinfo .userinfo h2 .lv {
  font-size: 0.24rem;
  padding: 0 0.04rem;
  color: aliceblue;
  background-color: yellowgreen;
  border-radius: 3px;
  font-weight: normal;
}
#user_in .l-block {
  margin-top: 0.16rem;
  background-color: #fff;
}
#user_in .l-item {
  height: 1.13rem;
  line-height: 1.13rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0 0 0 0.32rem;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
#user_in .l-logo {
  width: 0.48rem;
  height: 0.48rem;
  line-height: 0.48rem;
  overflow: hidden;
}
#user_in .l-logo > i {
  display: inline-block;
  width: 100%;
  height: 100%;
  -webkit-background-size: contain;
  background-size: contain;
  background-position: center;
}
#user_in .l-logo > i.wallet {
  background: url("../assets/images/member1.png") no-repeat;
  -webkit-background-size: 0.38rem 0.32rem;
  background-size: 0.38rem 0.32rem;
}
#user_in .l-info {
  height: 1.13rem;
  line-height: 1.13rem;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-left: 0.32rem;
  border-bottom: 0.01rem solid rgba(153, 153, 153, 0.3);
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
#user_in .l-name {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size: 0.28rem;
}
#user_in .l-opera {
  margin-right: 0.32rem;
  height: 1.13rem;
  line-height: 1.13rem;
  font-size: 0.28rem;
}
#user_in .bean {
  background: url("../assets/images/member2.png") no-repeat;
}
#user_in .l-opera .bs-button {
  width: 1.12rem;
  height: 0.5rem;
  line-height: 0.48rem;
  font-size: 0.24rem;
}
.bs-button.button-fill {
  display: inline-block;
  padding: 0 0.2rem;
  border: 1px solid #00c98d;
  border-radius: 0.08rem;
  font-size: 0.28rem;
  text-align: center;
  background: #00c98d;
  color: #fff;
}
#user_in .clock {
  background: url("../assets/images/member3.png") no-repeat;
}
#user_in .l-opera.more-link > img {
  height: 0.32rem;
  margin-top: 0.38rem;
}
#user_in .ubook {
  background: url("../assets/images/member4.png") no-repeat;
}
#user_in .shelf {
  background: url("../assets/images/member6.png") no-repeat;
}
#user_in .clocked {
  background: url("../assets/images/member7.png") no-repeat;
}
#user_in .logout {
  background: url("../assets/images/member8.jpg") no-repeat;
}
</style>
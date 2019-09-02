<template>
  <div id="login">
    <ReturnHead title="登录" show="true"></ReturnHead>
    <div class="logo">
      <img src="../assets/images/shuqiLogo.jpg" alt />
    </div>

    <div>
      <div class="login-input">
        <van-cell-group>
          <van-field
            v-model="login.keys"
            required
            clearable
            label="用户名/手机"
            placeholder="请输入用户名/手机号..."
          />
          <van-field
            v-model="login.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
        </van-cell-group>
        <div class="getMsg">
          <router-link :to="{name:'register'}" class="toLogin">点击注册</router-link>
        </div>

        <div class="button-login">
          <van-button @click="todoLogin" type="primary" size="large">登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Vue from "vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      login: {}
    };
  },
  methods: {
    todoLogin() {
      this.$axios.post("/vue/login", this.login).then(res => {
        if (!!res.data.type) {
          sessionStorage.userInfo = JSON.stringify({
            token: res.data.token,
            username: res.data.username
          });
          this.$router.push({
            name: "home"
          });
        } else {
          Dialog.alert({
            message: res.data.msg
          });
          sessionStorage.userInfo = JSON.stringify({
            token: ""
          });
        }
      });
    }
  }
};
</script>

<style scoped>
#login {
  height: 100vh;
  background: url("../assets/images/bg1.jpg") no-repeat;
  background-size: 100% 100%;
}
.logo {
  padding: 0.4rem 0 0;
  width: 100%;
  text-align: center;
}
.logo > img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-block;
}
.register-input,
.button-register,
.button-login,
.login-input {
  padding: 0.4rem 0;
}
div.getMsg {
  background: #fff;
  text-align: right;
  padding: 0 0.2rem;
}
</style>
<template>
  <div id="register">
    <ReturnHead title="注册" show="true"></ReturnHead>
    <div class="logo">
      <img src="../assets/images/shuqiLogo.jpg" alt />
    </div>

    <div class="register-input">
      <van-cell-group>
        <van-field
          v-model="register.username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('请输入长度为4~8的用户名')"
          :error-message="errusername"
        />
        <van-field
          v-model="register.password"
          type="password"
          required
          label="密码"
          right-icon="question-o"
          placeholder="请输入密码"
          @click-right-icon="$toast('请输入长度为6-12位的密码,包含字母和数字')"
          :error-message="errpassword"
        />
        <van-field
          v-model="register.dbpwd"
          type="password"
          required
          clearable
          label="确认密码"
          placeholder="请输入相同的密码"
          :error-message="errdbpwd"
        />
        <van-field
          v-model="register.mobile"
          required
          clearable
          label="手机号"
          right-icon="question-o"
          placeholder="请输入手机号"
          @click-right-icon="$toast('请输入长度为11的手机号')"
          :error-message="errtelphone"
        />
      </van-cell-group>
      <div class="getMsg">
        <van-checkbox v-model="checked">
          <p class="msg">同意《阿里文学用户服务协议》和《隐私服务协议》</p>
        </van-checkbox>
        <router-link :to="{name:'login'}" class="toLogin">已有账号?</router-link>
      </div>
      <div class="button-register">
        <van-button color="#7232dd" @click="todoRegister" size="large">立即注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      register: {},
      checked: false,
      errusername: "",
      errtelphone: "",
      errpassword: "",
      errdbpwd: ""
    };
  },
  methods: {
    todoRegister() {
      let check = 0;
      if (!/^[a-zA-Z_$][a-zA-Z_$0-9]{4,8}$/.test(this.register.username)) {
        this.errusername = "用户名须字母开头,由数字字母下划线组成,长度为4到8位";
      } else {
        this.errusername = "";
        check++;
      }

      if (!/^[a-zA-Z0-9]{6,12}$/.test(this.register.password)) {
        this.errpassword = "密码由字母或者数字组成,长度为6到12位";
      } else {
        this.errpassword = "";
        check++;
      }

      if (!/^1\d{10}$/.test(this.register.mobile)) {
        this.errtelphone = "请输入11位手机号";
      } else {
        this.errtelphone = "";
        check++;
      }

      if (
        !new RegExp("^" + this.register.password + "$").test(
          this.register.dbpwd
        )
      ) {
        this.errdbpwd = "两次密码不一致";
      } else {
        this.errdbpwd = "";
        check++;
      }
      if (!this.checked) {
        Dialog.alert({
          message: "同意协议后注册..."
        });
      }
      if (check == 4 && this.checked) {
        this.$axios.post("/vue/register", this.register).then(res => {
          if (!!res.data.type) {
            this.$router.push({
              name: "login"
            });
          } else {
            Dialog.alert({
              message: "注册失败"
            });
          }
          this.register = {};
        });
      }
    }
  }
};
</script>

<style scoped>
#register {
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
.toLogin {
  background: #fff;
  color: #999;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
}
.getMsg .msg {
  font-size: 0.24rem;
}
</style>
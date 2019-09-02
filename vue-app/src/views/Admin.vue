<template>
  <div id="admin">
    <ReturnHead title="修改密码" show="true"></ReturnHead>
    <h1></h1>
    <div class="logo">
      <img :src="this.touxiang" alt />
    </div>
    <div class="change-password">
      <van-cell-group>
        <van-field
          v-model="newPassword.password"
          type="password"
          required
          label="原密码"
          right-icon="question-o"
          placeholder="请输入原密码"
          @click-right-icon="$toast('请输入长度为6-12位的密码')"
          :error-message="errpassword"
        />
        <van-field
          v-model="newPassword.newpassword"
          type="password"
          required
          label="密码"
          right-icon="question-o"
          placeholder="请输入新密码"
          @click-right-icon="$toast('请输入长度为6-12位的密码')"
          :error-message="errnewpassword"
        />
        <van-field
          v-model="newPassword.newdbpwd"
          type="password"
          required
          clearable
          label="确认密码"
          placeholder="请输入相同的密码"
          :error-message="errnewdbpwd"
        />
      </van-cell-group>
    </div>
    <van-button color="#7232dd" @click="todoChange" size="large">确定更改</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      newPassword: {},
      username: "",
      errpassword: "",
      errnewpassword: "",
      errnewdbpwd: ""
    };
  },
  computed: {
    ...mapState(["touxiang"])
  },
  methods: {
    ...mapMutations(["changeTouxiang"]),
    todoChange() {
      Dialog.confirm({
        title: "更改密码",
        message: "您确认要更改密码吗？"
      }).then(() => {
        // on confirm
        let check = 0;
        if (!/^[a-zA-Z0-9]{6,12}$/.test(this.newPassword.newpassword)) {
          this.errnewpassword = "密码由字母或者数字组成,长度为6到12位";
        } else {
          this.errnewpassword = "";
          check++;
        }
        if (
          !new RegExp("^" + this.newPassword.newpassword + "$").test(
            this.newPassword.newdbpwd
          )
        ) {
          this.errnewdbpwd = "两次密码不一致";
        } else {
          this.errnewdbpwd = "";
          check++;
        }
        if (check == 2) {
          this.$axios
            .post("/vue/changePassword", this.newPassword)
            .then(res => {
              const that = this;
              if (res.data.type == 1) {
                Dialog.alert({
                  message: "修改密码成功"
                }).then(() => {
                  // on close
                  that.$router.push({
                    name: "login"
                  });
                });
              } else if (res.data.type == 2) {
                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  that.errnewpassword = res.data.msg;
                });
              } else {
                Dialog.alert({
                  message: res.data.msg
                }).then(() => {
                  that.errpassword = res.data.msg;
                });
              }
            });
        }
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
#admin {
  height: 100vh;
  background: url("../assets/images/bg1.jpg") no-repeat;
  background-size: 100% 100%;
}
.logo {
  padding: 0.4rem 0 0;
  width: 100%;
  text-align: center;
  margin-bottom: 0.4rem;
}
.logo > img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-block;
}
.change-password {
  margin-bottom: 0.4rem;
}
</style>
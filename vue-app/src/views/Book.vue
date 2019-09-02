<template>
  <div id="my-book">
    <ReturnHead title="我的书架" show="true"></ReturnHead>
    <div v-if="show">
      <p class="b-title">
        <span>我的书架</span>
        <span class="delete" @click="flag=!flag">{{this.flag?'取消':'删除'}}</span>
      </p>
      <ul class="mybook-list">
        <li v-for="(mybook,i) in myBooks" :key="i">
          <van-tag
            type="warning"
            class="close"
            v-if="flag"
            @click="deleteMybook(mybook.username,mybook.title,i)"
          >x</van-tag>
          <router-link :to="{name:'detail',params:{bookId:mybook.bookInfo._id}}">
            <div class="pic-book">
              <img :src="mybook.bookInfo.iconUrl" alt />
            </div>
            <h3 class="title-book">{{mybook.title}}</h3>
          </router-link>
        </li>
        <li class="add">
          <router-link :to="{
            name:'home'
          }">
            <div class="pic-book"></div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="no-book" v-if="!show">
      <img src="../assets/images/mybook1.png" alt />
      <router-link :to="{name:'home'}">
        <van-button color="#00c98d">去书城逛逛</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: true,
      myBooks: [],
      flag: false
    };
  },
  methods: {
    deleteMybook(username, title, i) {
      Dialog.confirm({
        title: "删除书籍",
        message: "您确认要删除吗？"
      }).then(() => {
        const that = this;
        this.$axios
          .post("/vue/dltBook", {
            title
          })
          .then(res => {
            console.log(res);
            this.myBooks.splice(i, 1);
            if (this.myBooks.length == 0) {
              this.show = false;
            }
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
    this.$axios.post("/vue/findMyBook").then(res => {
      if (res.data.result.length == 0) {
        this.show = false;
      } else {
        this.myBooks = res.data.result;
      }
    });
  }
};
</script>

<style scoped>
#my-book {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
#my-book .b-title {
  width: 100%;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  box-sizing: border-box;
}
#my-book .b-title .delete {
  color: red;
}
#my-book .mybook-list {
  width: 100%;
  display: flex;
  padding: 0.5rem 2%;
  box-sizing: border-box;
  flex-wrap: wrap;
}
#my-book .mybook-list > li {
  width: 25%;
  margin-left: 6%;
  margin-bottom: 0.5rem;
  position: relative;
}
#my-book .mybook-list .add .pic-book {
  background: url("../assets/images/mybook2.png") no-repeat center center;
  background-size: 0.6rem;
  border: 1px solid #ccc;
  height: 2.5rem;
  width: 100%;
}
#my-book .mybook-list > li .close {
  display: inline-block;
  padding: 0.2em 0.5em;
  color: #fff;
  font-size: 10px;
  line-height: normal;
  border-radius: 50%;
  background: red;
  position: absolute;
  right: -0.1rem;
  top: -0.1rem;
}
#my-book .mybook-list > li img {
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.2rem;
}
#my-book .mybook-list > li > .title-book {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
#my-book .no-book {
  width: 100vw;
  height: 100vh;
  padding: 0.2rem 0.5rem;
  box-sizing: border-box;
  margin-top: 1.5rem;
}
.no-book img {
  width: 100%;
  height: auto;
}
.van-button {
  position: relative;
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 44px;
  margin: 0;
  padding: 0 15px;
  font-size: 14px;
  line-height: 42px;
  text-align: center;
  border-radius: 2px;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  margin-left: 2rem;
  margin-top: 0.5rem;
}
</style>
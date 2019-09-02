<template>
  <div>
    <ReturnHead title="搜索" show="true"></ReturnHead>
    <van-search v-model="value" placeholder="搜索书架或书城" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <List :list="list" v-if="flag">
      <div v-if="list.length!=0&&flag?false:true" class="no-msg">
        <p>暂无数据，小编正在努力...</p>
      </div>
    </List>
    <div v-else>
      <div class="container">
        <p class="s-title">大家都在搜</p>
        <div class="hotrecomm_wrap" id="block-schmod">
          <ul class="hotrecomm">
            <li v-for="(book,i) in find" :key="i">
              <router-link :to="{name:'detail',params:{bookId:book._id}}">
                <div class="ellipsis">{{book.title}}</div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="modular-link refresh-click" @click="changeFind">
          <span class="modular-text">换一换</span>
          <span class="refresh"></span>
        </div>
      </div>
      <div class="content-history">
        <p class="b-title" v-if="show">
          <span>搜索历史</span>
          <span class="delete" @click="dltHistory">删除</span>
        </p>
        <div class="hotrecomm_wrap" id="block-schmod">
          <ul class="hotrecomm">
            <li v-for="(keyword,i) in history" :key="i">
              <div class="ellipsis" @click="searchIt(keyword,onSearch)">{{keyword}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: "",
      list: [],
      find: [],
      history: [],
      flag: false,
      show: false
    };
  },
  computed: {
    ...mapState(["keywords"])
  },
  methods: {
    ...mapMutations(["addKeyword"]),
    dltHistory() {
      localStorage.keywords = [];
      this.$router.go(0);
    },
    searchIt(key, fn) {
      this.value = key;
      fn();
    },
    onSearch() {
      this.$axios
        .get("/vue/getSearch", {
          params: {
            keyword: this.value
          }
        })
        .then(res => {
          this.list = res.data.result;
          this.flag = true;
        });
      if (this.keywords.indexOf(this.value) == -1) {
        this.addKeyword(this.value);
        localStorage.keywords = JSON.stringify(this.keywords);
      }
    },
    changeFind() {
      this.$axios.get("/vue/manyFound").then(res => {
        var bookArr = [];
        var numArr = [];
        for (var i = 0; i < 8; i++) {
          var num = Math.round(Math.random() * (res.data.result.length - 1));
          var state = true;
          for (var j = 0; j < numArr.length; j++) {
            //遍历数组中的每一项，和新添加的num比较，如果重复，则不向数组中添加，i后退一位；否则加入数组中
            if (num == numArr[j]) {
              state = false;
              i--;
              break;
            }
          }
          if (state) {
            bookArr.push(res.data.result[num]);
          }
        }
        this.find = bookArr;
        bookArr = [];
      });
    }
  },
  mounted() {
    this.$axios.get("/vue/manyFound").then(res => {
      var bookArr = [];
      var numArr = [];
      for (var i = 0; i < 8; i++) {
        var num = Math.round(Math.random() * (res.data.result.length - 1));
        var state = true;
        for (var j = 0; j < numArr.length; j++) {
          //遍历数组中的每一项，和新添加的num比较，如果重复，则不向数组中添加，i后退一位；否则加入数组中
          if (num == numArr[j]) {
            state = false;
            i--;
            break;
          }
        }
        if (state) {
          bookArr.push(res.data.result[num]);
        }
      }
      this.find = bookArr;
      bookArr = [];
    });
    if (localStorage.keywords) {
      this.history = JSON.parse(localStorage.keywords);
      if (this.history) {
        this.show = true;
      }
    }
  }
};
</script>

<style scoped>
.no-msg {
  width: 100%;
  height: 7rem;
  text-align: center;
  line-height: 7rem;
  color: #333;
}
.container {
  padding: 0.2rem;
  box-sizing: border-box;
  background-color: #fff;
}
.container .s-title {
  font-size: 0.3rem;
  color: #afaeae;
}
.hotrecomm_wrap {
  padding: 0.4rem 0 0.2rem;
}
.hotrecomm {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.hotrecomm li {
  width: 28%;
  padding: 0 0.14rem;
  margin-bottom: 0.2rem;
}
.hotrecomm li div {
  border: 0.02rem solid #e6e6e6;
  border-radius: 0.3rem;
  height: 0.62rem;
  line-height: 0.62rem;
  font-size: 0.24rem;
  color: #333;
  padding: 0 0.18rem;
  text-align: center;
  box-sizing: border-box;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
.modular-link {
  width: 100%;
  height: 0.96rem;
  line-height: 0.96rem;
  color: #333;
  font-size: 0.28rem;
  vertical-align: middle;
  display: inline-block;
  text-align: center;
}
.content-history {
  background: #fff;
}
.content-history .b-title {
  width: 100%;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  box-sizing: border-box;
}
.content-history .b-title .delete {
  color: red;
}
</style>
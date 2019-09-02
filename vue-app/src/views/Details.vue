<template>
  <div id="detailsBody">
    <ReturnHead :title="title" show="true"></ReturnHead>
    <section class="cover-header" lmk="bookCover" lmv="头部区域">
      <div class="cover-header-img">
        <img :src="this.bookInfo.iconUrl" />
      </div>
      <div class="cover-header-info">
        <h1 class="cover-book-title">{{this.title}}</h1>
        <p class="cover-book-author">{{this.bookInfo.author}}</p>
        <p
          class="cover-book-classify-etc"
        >分类：{{this.bookInfo.category}} | {{this.bookInfo.bookStatus==1.0?'已完结':"连载中"}}</p>
        <p
          class="cover-book-classify-etc1"
        >{{this.bookInfo.readCount}}人阅读 | 共{{this.bookInfo.showTotalCount}}字</p>
      </div>
    </section>
    <section class="cover-fn-buttons" lmk="bookCover" lmv="头部区域">
      <router-link :to="{name:'common'}" class="bs-button button-fill button-block">
        <div>开始阅读</div>
      </router-link>
      <router-link :to="{name:'common'}" class="bs-button button-block">
        <div>离线下载</div>
      </router-link>
      <div class="bs-button button-block joinbook" @click="jionMybook">加书架</div>
    </section>
    <section class="cover-mate" lmk="bookCover" lmv="头部区域">
      <div class="cover-book-desc" lmurl="#" v-html="this.bookInfo.description">
        <span class="extend-button">
          <i></i>
        </span>
      </div>
      <router-link :to="{name:'common'}" class="cover-book-latest-chapter">
        <i class="cover-icon icon-clock"></i>
        <div class="cover-mate-title">最新</div>
        <div class="cover-mate-text"></div>
        <i class="cover-icon icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'common'}" class="cover-book-directory">
        <i class="cover-icon icon-dir"></i>
        <div class="cover-mate-title">目录</div>
        <div class="cover-mate-text">{{this.bookInfo.bookStatus==1.0?'已完结':"连载中"}}</div>
        <i class="cover-icon icon-right-arrow"></i>
      </router-link>
    </section>
    <section class="cover-comments">
      <header class="header header-line">
        <h3 class="title">作者有话说</h3>
      </header>
      <ul class="comments-list">
        <li class="comment-item">
          <div class="comment">
            <div class="comment-header">
              <img
                class="avatar-small"
                :src="this.bookInfo.iconUrl"
                data-src="http://img-tailor.11222.cn/account/avatar/e2a61f5dfba3e14dcd754d2b6d9e85e5@120w_120h"
                :alt="this.bookInfo.author"
              />
              <span class="user-info-line">
                <span class="user-info-name">{{this.bookInfo.author}}</span>
              </span>
            </div>
            <div class="comment-body">
              <div class="comment-content">
                跟兄弟们说一下更新时间，每天上午十点两更，下午四点两更，每天四更
                <span class="face-tooth"></span>
                不定时爆更。
                看在{{this.bookInfo.author}}努力更新的份上，投点月票吧，推荐票也见底了，兄弟们加油帮忙投票啊
                <span
                  class="face-laugh"
                ></span>
              </div>
            </div>
          </div>
        </li>
        <li class="comment-item">
          <div class="comment">
            <div class="comment-header">
              <img class="avatar-small" :src="this.bookInfo.iconUrl" :alt="this.bookInfo.author" />
              <span class="user-info-line">
                <span class="user-info-name">{{this.bookInfo.author}}</span>
              </span>
            </div>
            <div class="comment-body">
              <div
                class="comment-content"
              >兄弟们好，我是《{{this.bookInfo.title}}》的作者{{this.bookInfo.author}}，欢迎加入{{this.bookInfo.title}}书友群，群聊号码：xxxxxxxxx，希望兄弟们有什么建议可以在群里提出来，{{this.bookInfo.author}}和大家一起聊天聊剧情，欢迎大家加入。</div>
            </div>
          </div>
        </li>
        <li class="comment-item">
          <div class="comment">
            <div class="comment-header">
              <img class="avatar-small" :src="this.bookInfo.iconUrl" :alt="this.bookInfo.author" />
              <span class="user-info-line">
                <span class="user-info-name">{{this.bookInfo.author}}</span>
              </span>
            </div>
            <div class="comment-body">
              <div class="comment-content">
                兄弟们，{{this.bookInfo.author}}在外站有百万字完本老书，所以本书绝对不会无故断更和烂尾，大家放心看
                <span
                  class="face-tooth"
                ></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="cover-related-books" lmk="relatedBooks" lmv="看过这本书的人还在看">
      <header class="header header-nospaceing">
        <h3 class="title">看过这本书的人还在看</h3>
      </header>
      <van-row
        type="flex"
        justify="space-around"
        style="backgroundColor:#fff;padding-bottom:0.15rem;"
      >
        <van-col span="6" v-for="(book,i) in booksList" :key="i">
          <router-link :to="{name:'detail',params:{bookId:book._id}}">
            <div class="book-cover">
              <img :src="book.iconUrl" />
            </div>
            <div class="book-title">{{book.title}}</div>
            <div class="book-author">{{book.author}}</div>
          </router-link>
        </van-col>
      </van-row>
      <div class="modular-link" @click="changeBooks">
        <span class="modular-text">换一换</span>
        <span class="refresh"></span>
      </div>
    </section>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <div slot="title">
          <h3 class="title">图书相关信息</h3>
        </div>
        <div class="cover-about-content" style="height: auto;" data-is-inited="true">
          <p>
            版权来源：
            <span class="color-primary">书旗小说</span>
          </p>
          <p>
            免责声明：
            <span class="cover-about-desc">本书的数字版权由原创版权提供，授权本软件使用，制作,发行，若包含不良信息，请及时告知客服。</span>
          </p>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      title: "",
      bookInfo: {},
      booksList: [],
      activeNames: ["1"]
    };
  },
  methods: {
    changeBooks() {
      this.$axios
        .post("/vue/getSameBooks", {
          category: this.bookInfo.category
        })
        .then(res => {
          this.booksList = res.data.result.filter(item => {
            return this.$route.params.bookId != item._id;
          });
          let count = Math.round(Math.random() * (this.booksList.length - 4));
          this.booksList = this.booksList.splice(count, 4);
        });
    },
    jionMybook() {
      this.$axios
        .post("/vue/joinMybook", {
          bookInfo: this.bookInfo,
          title: this.title
        })
        .then(res => {
          if (!!res.data.type) {
            Dialog.alert({
              message: res.data.msg
            });
          } else {
            Dialog.alert({
              message: res.data.msg
            });
          }
        });
    }
  },
  mounted() {
    this.$axios
      .post("/vue/getBookinfo", {
        _id: this.$route.params.bookId
      })
      .then(res => {
        const that = this;
        that.title = res.data.result.title;
        that.bookInfo = res.data.result;
        this.$axios
          .post("/vue/getSameBooks", {
            category: that.bookInfo.category
          })
          .then(res => {
            that.booksList = res.data.result.filter(item => {
              return this.$route.params.bookId != item._id;
            });
            that.booksList = that.booksList.splice(0, 4);
          });
      });
  }
};
</script>

<style>
.cover-header {
  height: 3.32rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0.4rem 0.32rem 0;
  overflow: hidden;
  background-color: #fff;
}
.cover-header-img {
  width: 1.96rem;
  height: 2.6rem;
  margin-right: 0.32rem;
}
.cover-header-img img {
  width: 100%;
  height: 100%;
}
.cover-header-info {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size: 0.28rem;
  color: #999;
  line-height: 0.4rem;
  overflow: hidden;
}
.cover-book-title {
  font-size: 0.36rem;
  color: #333;
  line-height: 0.46rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.cover-book-author {
  color: #999;
  padding: 0.24rem 0 0.16rem;
}
.cover-book-classify-etc {
  margin-bottom: 0.16rem;
}
.cover-fn-buttons {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0 0.32rem;
  background-color: #fff;
  justify-content: space-around;
}
/* .cover-fn-buttons .bs-button:not(:last-child) {
  margin-right: 0.28rem;
} */
.cover-fn-buttons .bs-button {
  /* -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1; */
  width: 24%;
}
.bs-button.button-fill {
  background: #00c98d;
  color: #fff;
}
.bs-button {
  display: inline-block;
  height: 0.78rem;
  line-height: 0.8rem;
  padding: 0 0.2rem;
  border: 1px solid #00c98d;
  border-radius: 0.08rem;
  font-size: 0.28rem;
  color: #00c98d;
  text-align: center;
}
.cover-mate,
.cover-comments {
  margin-bottom: 0.16rem;
  background-color: #fff;
}
.cover-book-desc {
  position: relative;
  /* margin: 0 0.32rem; */
  padding: 0.28rem 0.32rem 0;
  font: 0.28rem "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  color: #494949;
}
.cover-book-latest-chapter,
.cover-book-directory {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 1.08rem;
  padding: 0 0.32rem;
  font-size: 0.24rem;
  color: #999;
  background-color: #fff;
}
.cover-icon {
  display: block;
  height: 0.36rem;
  width: 0.36rem;
  margin-right: 0.16rem;
  /* vertical-align: middle; */
}
.icon-clock {
  background-image: url("../assets/images/details1.png");
  -webkit-background-size: 100% 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 -1px;
}
.icon-dir {
  background-image: url("../assets/images/details3.png");
  -webkit-background-size: 100% 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 -1px;
}
.cover-mate-title {
  font-size: 0.28rem;
  color: #333;
}
.cover-mate-text {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 0 0.32rem;
}
.icon-right-arrow {
  height: 0.3rem;
  width: 0.14rem;
  background-image: url("../assets/images/details2.png");
  -webkit-background-size: 0.1rem 0.18rem;
  background-size: 0.1rem 0.18rem;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 0.1rem;
}
.cover-book-latest-chapter:after {
  content: "";
  border-bottom: 1px solid #f2f2f2;
  position: absolute;
  bottom: 0;
  left: 0.32rem;
  right: 0.32rem;
}
.comment-item {
  position: relative;
  padding-left: 0.32rem;
}
.comment,
.comment-primary {
  position: relative;
  padding: 0 0 0.3rem;
}
.comment-header {
  font-size: 0;
  position: relative;
  height: 0.48rem;
}
.comment .comment-header,
.comment-primary .comment-header {
  padding: 0 0.32rem;
}
.avatar-small {
  width: 0.48rem;
  height: 0.48rem;
}
.avatar,
.avatar-smaller,
.avatar-small,
.avatar-medium,
.avatar-large {
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.user-info-line {
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
}
.comment-header .user-info-line {
  margin-left: 0.24rem;
}
.user-info-line .user-info-name {
  line-height: 0.4rem;
  height: 0.4rem;
  color: #999;
  vertical-align: middle;
  display: inline-block;
  font-size: 0.24rem;
}
.comment .comment-body,
.comment-primary .comment-body {
  padding: 0.08rem 0.32rem 0.16rem 1.04rem;
}
.comment-content {
  font-size: 0.28rem;
  color: #333;
  position: relative;
  line-height: 0.44rem;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  max-height: 440rem;
  word-break: break-word;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.modular-link,
.modular-link-retry {
  width: 100%;
  height: 0.96rem;
  line-height: 0.96rem;
  color: #333;
  font-size: 0.28rem;
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  border-top: 1px solid #f3f3f3;
  background-color: #fff;
}
.modular-link .refresh,
.modular-link-retry .refresh {
  display: inline-block;
  width: 0.24rem;
  height: 0.24rem;
  background-image: url("../assets/images/details4.png");
  -webkit-background-size: 0.24rem 0.24rem;
  background-size: 0.24rem;
  margin-left: 0.08rem;
  vertical-align: middle;
}
.title {
  padding-left: 0.32rem;
  color: #333;
  display: inline-block;
  height: 0.32rem;
  line-height: 0.32rem;
  font-size: 0.28rem;
  position: relative;
}
.title:after {
  content: "";
  width: 0.06rem;
  height: 0.28rem;
  display: inline-block;
  background: #00c98d;
  position: absolute;
  top: 0.02rem;
  left: 0;
}
#detailsBody .van-cell {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px 10px 0;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.color-primary {
  color: #00c98d;
}
.van-col {
  box-sizing: border-box;
  min-height: 1px;
  text-align: center;
}
.van-col--6 {
  width: 23%;
  text-align: center;
  font-size: 0.24rem;
}
.van-col--6 img {
  width: 1.6rem;
  height: 2.24rem;
  display: inline-block;
}
.van-col--6 .book-title {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
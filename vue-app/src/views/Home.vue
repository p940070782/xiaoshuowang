<template>
  <div id="body">
    <Head></Head>
    <SwipeDemo id="swipetwo" :options="swiperOptions">
      <swipeItem v-for="(img,i) in imgs" :key="i">
        <img :src="img" alt class="g-img" />
      </swipeItem>
    </SwipeDemo>
    <nav class="new_icon_config">
      <ul class="navul">
        <li class="navli">
          <router-link :to="{name:'fenlei'}">
            <i class="flicon nav-ic-0"></i>
            <h2>分类</h2>
          </router-link>
        </li>
        <li class="navli">
          <i class="flicon nav-ic-1"></i>
          <h2>排行</h2>
        </li>
        <li class="navli">
          <router-link :to="{name:'classify',params:{category:'women'},query:{category:'女生'}}">
            <i class="flicon nav-ic-2"></i>
            <h2>女频</h2>
          </router-link>
        </li>
        <router-link :to="{name:'classify',params:{category:'men'},query:{category:'男生'}}">
          <li class="navli">
            <i class="flicon nav-ic-3"></i>
            <h2>男频</h2>
          </li>
        </router-link>
        <li class="navli">
          <i class="flicon nav-ic-4"></i>
          <h2>书单</h2>
        </li>
      </ul>
    </nav>
    <div>
      <header class="header header-nospaceing">
        <h3 class="title">精品推荐</h3>
      </header>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6" v-for="(home,i) in homeList" :key="i">
        <router-link :to="{name:'detail',params:{bookId:home._id}}">
          <div class="book-cover">
            <img :src="home.iconUrl" />
          </div>
          <div class="book-title">{{home.title}}</div>
          <div class="book-author">{{home.author}}</div>
        </router-link>
      </van-col>
    </van-row>
    <van-divider
      :style="{ color: 'yellowgreen', borderColor: '#999', padding: '0 0.1rem' ,fontWeight:'bolder',fontFamily:'宋体'}"
    >男生爱看</van-divider>
    <div>
      <header class="header header-nospaceing">
        <h3 class="title">都市传奇</h3>
      </header>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6" v-for="(dushi,i) in dushiList" :key="i">
        <router-link :to="{name:'detail',params:{bookId:dushi._id}}">
          <div class="book-cover">
            <img :src="dushi.iconUrl" />
          </div>
          <div class="book-title">{{dushi.title}}</div>
          <div class="book-author">{{dushi.author}}</div>
        </router-link>
      </van-col>
    </van-row>
    <div>
      <header class="header header-nospaceing">
        <h3 class="title">魔法玄幻</h3>
      </header>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6" v-for="(xuanhuan,i) in xuanhuanList" :key="i">
        <router-link :to="{name:'detail',params:{bookId:xuanhuan._id}}">
          <div class="book-cover">
            <img :src="xuanhuan.iconUrl" />
          </div>
          <div class="book-title">{{xuanhuan.title}}</div>
          <div class="book-author">{{xuanhuan.author}}</div>
        </router-link>
      </van-col>
    </van-row>
    <van-divider
      :style="{ color: 'orange', borderColor: '#999', padding: '0 0.1rem' ,fontWeight:'bolder',fontFamily:'宋体'}"
    >女生爱看</van-divider>

    <div>
      <header class="header header-nospaceing">
        <h3 class="title">现代言情</h3>
      </header>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6" v-for="(xianyan,i) in xianyanList" :key="i">
        <router-link :to="{name:'detail',params:{bookId:xianyan._id}}">
          <div class="book-cover">
            <img :src="xianyan.iconUrl" />
          </div>
          <div class="book-title">{{xianyan.title}}</div>
          <div class="book-author">{{xianyan.author}}</div>
        </router-link>
      </van-col>
    </van-row>
    <div>
      <header class="header header-nospaceing">
        <h3 class="title">纯情校园</h3>
      </header>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6" v-for="(xiaoyuan,i) in xiaoyuanList" :key="i">
        <router-link :to="{name:'detail',params:{bookId:xiaoyuan._id}}">
          <div class="book-cover">
            <img :src="xiaoyuan.iconUrl" />
          </div>
          <div class="book-title">{{xiaoyuan.title}}</div>
          <div class="book-author">{{xiaoyuan.author}}</div>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data() {
    return {
      imgs: [
        require("@/assets/images/shuqiHome1.jpg"),
        require("@/assets/images/shuqiHome2.jpg"),
        require("@/assets/images/shuqiHome3.jpg"),
        require("@/assets/images/shuqiHome4.png")
      ],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      homeList: [],
      dushiList: [],
      xuanhuanList: [],
      xianyanList: [],
      xiaoyuanList: []
    };
  },
  mounted() {
    this.$axios.get("/vue/getHome").then(res => {
      var count = Math.round(Math.random() * 4);
      this.dushiList = res.data.homeList.splice(0, 4);
      this.xuanhuanList = res.data.homeList.splice(2, 4);
      this.xianyanList = res.data.homeList.splice(4, 4);
      this.xiaoyuanList = res.data.homeList.splice(6, 4);
      this.homeList = res.data.homeList.splice(count, 4);
    });
  }
};
</script>

<style>
#body {
  background: #fff;
  margin-bottom: 0.9rem;
}
a {
  color: #999;
}
#guide,
#swipetwo,
.g-img {
  width: 100%;
  height: 4rem;
}
nav {
  padding: 0.3rem 0 0.24rem;
  margin: 0 0.4rem;
  display: block;
}
.navul {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-pack: justify;
  list-style: none;
}
.navli {
  text-align: center;
}
.navli {
  font-size: 0.28rem;
}
.navli i {
  background: url("../assets/images/shuqishouyefenlei.png") no-repeat;
  background-size: 0.88rem 4.4rem;
  display: inline-block;
  width: 0.88rem;
  height: 0.88rem;
}
.navli .nav-ic-0 {
  background-position: 0 0;
}
.navul .nav-ic-1 {
  background-position: 0 -0.88rem;
}
.navul .nav-ic-2 {
  background-position: 0 -1.76rem;
}
.navul .nav-ic-3 {
  background-position: 0 -2.64rem;
}
.navul .nav-ic-4 {
  background-position: 0 -3.52rem;
}
#body .van-divider {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0.2rem 0 0;
  color: #969799;
  line-height: 24px;
  border-color: #ebedf0;
  border-style: solid;
  border-width: 0;
  font-size: 0.3rem;
}
.header {
  background: #fff;
  width: 100%;
  padding: 0.32rem 0;
  font-size: 0;
  position: relative;
}
.header .title {
  padding-left: 0.32rem;
  color: #333;
  display: inline-block;
  height: 0.32rem;
  line-height: 0.32rem;
  font-size: 0.28rem;
  position: relative;
}
.header .title:after {
  content: "";
  width: 0.06rem;
  height: 0.28rem;
  display: inline-block;
  background: #09ce06;
  position: absolute;
  top: 0.02rem;
  left: 0;
}
.books-group-4 {
  margin: 0;
  text-align: center;
  padding: 0.32rem 0;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 0.24rem;
  box-sizing: border-box;
}
.books-group-4 .book {
  width: 25%;
  text-align: center;
}
.books-group-4 .book-cover {
  width: 100%;
  padding: 0 0.22rem;
}
.books-group-4 .book-cover .book-cover-img {
  width: 1.6rem;
}
.book-title {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
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
<template>
  <div id="contentBody">
    <ReturnHead title="分类" show="true"></ReturnHead>
    <div>
      <section class="m-lib men">
        <h3>
          <router-link :to="{name:'classify',params:{category:'men'},query:{category:'男生'}}">
            <em class="sep"></em>男生小说
          </router-link>
        </h3>
        <ul class="content">
          <li>
            <router-link :to="{name:'classify',params:{category:'dushi'},query:{category:'都市'}}">都市</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'xuanhuan'},query:{category:'玄幻'}}"
            >玄幻</router-link>
          </li>
          <li>
            <router-link :to="{name:'classify',params:{category:'lishi'},query:{category:'历史'}}">历史</router-link>
          </li>
          <li>
            <router-link :to="{name:'classify',params:{category:'junshi'},query:{category:'军事'}}">军事</router-link>
          </li>
          <li>
            <router-link :to="{name:'classify',params:{category:'kehuan'},query:{category:'科幻'}}">科幻</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'tongren'},query:{category:'同人'}}"
            >同人</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'duanpian'},query:{category:'短篇'}}"
            >短篇</router-link>
          </li>
        </ul>
      </section>
      <section class="m-lib women">
        <h3>
          <router-link :to="{name:'classify',params:{category:'women'},query:{category:'女生'}}">
            <em class="sep"></em>女生小说
          </router-link>
        </h3>
        <ul class="content">
          <li>
            <router-link
              :to="{name:'classify',params:{category:'xianyan'},query:{category:'现言'}}"
            >现言</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'chuanyue'},query:{category:'穿越'}}"
            >穿越</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'gongdou'},query:{category:'宫斗'}}"
            >宫斗</router-link>
          </li>
          <li>
            <router-link :to="{name:'classify',params:{category:'guyan'},query:{category:'古言'}}">古言</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'duanpian'},query:{category:'短篇'}}"
            >短篇</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'xiaoyuan'},query:{category:'校园'}}"
            >校园</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'xianxia'},query:{category:'仙侠'}}"
            >仙侠</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'zhongtian'},query:{category:'种田'}}"
            >种田</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'tongren'},query:{category:'同人'}}"
            >同人</router-link>
          </li>
        </ul>
      </section>
      <section class="m-lib book">
        <h3>
          <router-link :to="{name:'classify',params:{category:'图书'},query:{category:'图书'}}">
            <em class="sep"></em>图书书库
          </router-link>
        </h3>
        <ul class="content">
          <li>
            <router-link
              :to="{name:'classify',params:{category:'xiaoshuozuoping'},query:{category:'小说作品'}}"
              style="color:red"
            >小说作品</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'renwensheke'},query:{category:'人文社科'}}"
              style="color:red"
            >人文社科</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'classify',params:{category:'pinzhishenghuo'},query:{category:'品质生活'}}"
            >品质生活</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#contentBody {
  background: #fff;
  padding-bottom: 1rem;
}
.m-lib {
  background-color: #fff;
  margin-top: 0.1rem;
  margin-bottom: 0.08rem;
  padding: 0.5rem;
}
.m-lib h3 {
  height: 0.19rem;
  line-height: 0.19rem;
}
.m-lib h3 a {
  display: block;
  color: #00c98d;
  cursor: pointer;
}
.m-lib h3 a .sep {
  display: inline-block;
  background: #00c98d;
  border-radius: 3px;
  width: 0.025rem;
  height: 0.25rem;
  margin-right: 0.12rem;
  cursor: pointer;
}
.m-lib ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0.3rem 0 0;
}
.m-lib ul li {
  width: 33%;
  text-align: center;
  height: 0.5rem;
  font-size: 0.3rem;
  margin: 0.2rem 0;
}
.m-lib ul li a {
  display: block;
  width: 1.6rem;
  margin: 0 auto;
  height: 0.6rem;
  line-height: 0.6rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: #f5f5f5;
  color: #3b352d;
  border-radius: 0.04rem;
  cursor: pointer;
}
</style>
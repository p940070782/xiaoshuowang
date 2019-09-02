<template>
  <div>
    <header>
      <div @click="changeViews">
        <i class="iconfont">&#xe600;</i>
      </div>
      <input type="text" placeholder="请输入书名/作者/关键字" @click="toSearch" />
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    changeViews() {
      this.$router.push({ name: "member" });
    },
    toSearch() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>

<style scoped>
p {
  line-height: 0.3rem;
  font-size: 0.3rem;
  margin: 0.5rem 0;
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.5rem;
  box-sizing: border-box;
  align-items: center;
  background: #00c98d;
}
header .iconfont {
  color: aliceblue;
}
header > div > i {
  font-size: 0.4rem;
  cursor: pointer;
  border: 1px solid #dfdfdf;
  border-radius: 50%;
  padding: 2px;
}
header input {
  width: 85%;
  border: 1px solid #999;
  height: 0.4rem;
  outline: none;
  border-radius: 0.4rem;
  text-align: center;
  background: #f0f5f0f3;
}

.content {
  height: 100%;
}
.money {
  width: 60%;
  display: flex;
}
.money > div {
  width: 30%;
  font-size: 0.2rem;
  height: 1rem;
}
.money > div > p {
  margin: 0;
}
</style>
<template>
  <div :id="id">
    <ReturnHead :title="title" show="true"></ReturnHead>
    <List :list="list" :id="id"></List>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      list: [],
      id:'classify'
    };
  },
  mounted() {
    this.title = this.$route.query.category;
    this.$axios.post("/vue/typeList", { category: this.title}).then(res=>{
      this.list = res.data.result;
    })
  }
};
</script>

<style>
</style>
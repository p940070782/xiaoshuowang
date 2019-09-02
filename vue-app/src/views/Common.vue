<template>
  <div>
    <ReturnHead title="404Found" show="true"></ReturnHead>
    <div>
      <router-link :to="{name:'home'}">
        <img src="../assets/images/com404.jpg" alt srcset />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
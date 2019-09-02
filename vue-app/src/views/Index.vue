<template>
  <div>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from "@/components/Foot.vue";
export default {
  data(){
    return {

    }
  },
  components:{
    Foot
  }
};
</script>

<style scoped>
</style>
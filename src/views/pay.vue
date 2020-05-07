<template>
  <div class="pay">
    <div id="header" @click="goback()">
      <van-icon name="arrow-left" color="#ffffff" size="24" />
      <p>{{title}}</p>
      <i></i>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return{
         title:'80分运营俱乐部--支付',
      }
    },
    methods:{
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
</style>

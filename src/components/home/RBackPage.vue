<template>

  <div>
    <van-nav-bar
      fixed
      :z-index="999"
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view/>
  </div>
</template>

<script>
    export default {
      mounted(){
      },
      name: "r-back-page",
      methods:{
          onClickLeft(){
            this.$router.goBack()
          },
      },
      data(){
        return{
          title:this.$route.meta.title
        }
      }
    }
</script>

<style scoped>

</style>

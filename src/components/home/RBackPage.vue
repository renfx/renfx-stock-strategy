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
    <router-view style="margin-top: 46px" @setTitle="setTitle"/>
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
        setTitle(title){
            this.title=title;
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

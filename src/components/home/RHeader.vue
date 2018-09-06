<template>
    <div>
      <van-nav-bar
                   @click-left="onClickLeft"
                   @click-right="showRight=!showRight"
      >
        <van-icon name="contact" slot="left" />
        <van-icon name="search"  slot="right" />
        <van-tabbar v-model="active" style="height: 46px;" slot="title" :fixed="false">
          <van-tabbar-item style="flex-direction: initial;">A股</van-tabbar-item>
          <van-tabbar-item style="flex-direction: initial;">美股</van-tabbar-item>
          <van-tabbar-item style="flex-direction: initial;">证券</van-tabbar-item>
          <van-tabbar-item style="flex-direction: initial;">证券</van-tabbar-item>
        </van-tabbar>
      </van-nav-bar>



      <van-popup style="height: 100%;width: 80%" v-model="show" position="left" >
        <my/>
      </van-popup>

      <van-popup style="height: 100%;width: 100%" v-model="showRight" position="right" >
        <r-search @hide="showRight=false"/>
      </van-popup>
    </div>
</template>

<script>
    import My from "./My";
    import RSearch from "./RSearch";

    export default {
      components: {My,RSearch},
      data(){
        return{
          show:false,
          showRight:false,
          active:0,
        }
      },
      methods:{
        onClickLeft() {
          this.show = true
        },
      },
        name: "r-header"
    }
</script>

<style scoped>

</style>

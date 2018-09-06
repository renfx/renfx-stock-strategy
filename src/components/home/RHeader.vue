<template>
    <div>
      <van-nav-bar fixed title="标题"
                   @click-left="onClickLeft"
                   @click-right="showRight=!showRight"
      >
        <van-icon name="contact" slot="left" />
        <van-icon name="search"  slot="right" />

      </van-nav-bar>
      <van-popup style="height: 100%;width: 80%" v-model="show" position="left" >
        <my/>
      </van-popup>

      <van-popup style="height: 100%;width: 100%" v-model="showRight" position="right" >
        <r-search/>
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

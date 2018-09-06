<template>
    <div>
      <van-nav-bar
        style="height: 44px"
        fixed
                   @click-left="onClickLeft"
                   @click-right="clickSearch"
      >
        <van-icon name="contact" slot="left" />
        <van-icon name="search"  slot="right" />
        <van-tabs slot="title" :line-width="14" v-model="tabIndex">
          <van-tab v-for="(value,key) in topTabs" :key="key" >
            <div slot="title">
              {{value}}
            </div>
          </van-tab>
        </van-tabs>
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
          topTabs:{'0':'A股','1':'证券','2':'A股','3':'国外','4':'国外','5':'国外'},
          tabIndex:0,
        }
      },
      methods:{
        onClickLeft() {
          this.show = true
        },
        clickSearch(){
          this.$router.push("/search")
        }
      },
        name: "r-header"
    }
</script>

<style>
  .van-nav-bar__title {
    margin: 0 auto;
    max-width: 80%;
  }
</style>

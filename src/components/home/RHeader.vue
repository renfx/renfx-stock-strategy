<template>
  <div>
    <van-row class="fixed">
      <van-col span="3" @click.native="onClickLeft" style="line-height: 0px" class="van-tabbar-item van-nav-bar van-hairline--top-bottom top-left-right">
        <m-icon type="account_circle"/>
        <!--<van-icon name="contact"/>-->
      </van-col>
      <van-col span="17">
        <van-tabs @change='tabChange' v-model='tabIndex' style='display: -webkit-box;' :line-width="14">
          <van-tab :title='value' v-for="(value,index) in topTabs" :key="index">
            <div slot="title">
              {{value}}
            </div>
          </van-tab>
        </van-tabs>
      </van-col>
      <van-col span="4" @click.native="clickSearch" style="line-height: 0px" class="van-tabbar-item van-nav-bar van-hairline--top-bottom top-left-right">
        <m-icon type="search"/>
      </van-col>
    </van-row>


    <van-popup style="height: 100%;width: 80%" v-model="show" position="left">
      <my/>
    </van-popup>

    <van-popup style="height: 100%;width: 100%" v-model="showRight" position="right">
      <r-search @hide="showRight=false"/>
    </van-popup>
  </div>
</template>

<script>
  import My from "./My";
  import RSearch from "./RSearch";

  export default {
    props:['topTabs'],
    mounted(){
      let tabName = this.$route.params.tabName;
      this.tabNameIndex(tabName);
    },
    components: {My, RSearch},
    data() {
      return {
        show: false,
        showRight: false,
        active: 0,
        tabIndex: 0,
      }
    },
    methods: {
      tabNameIndex(tabName){
        return this.topTabs.forEach((v,k)=>{
          if(v==tabName){
            this.tabIndex = k;
          }
        })
      },
      onClickLeft() {
        this.show = true
      },
      clickSearch() {
        this.$router.push("/search")
      },
      tabChange(index, title) {
        this.$emit('tabChange', index, title)
      }
    },
    name: "r-header"
  }
</script>

<style scoped>
  .top-left-right {
    height: 44px;
    line-height: 40px;
  }

  .fixed {
    position: fixed;
    top: 0px;
    z-index: 99;
    width: 100%
  }
</style>

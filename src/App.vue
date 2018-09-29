<template>
  <div id="app">
    <transition :name='transitionName'>
      <keep-alive v-if="!$route.meta.notkeepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.notkeepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName:''
    }
  },
  watch:{
    $route(to, from) {
      let isBack = this.$router.isBack;
      if( isBack ){
        this.transitionName = 'van-fade'
      }else{
        this.transitionName = 'van-fade'
      }
      this.$router.isBack = false;
    }
  },
  methods: {
    queryBasicTables(){
      this.$api.postNoMsg('baseData/getByField',{fieldName:'basicStocks'}).then(response=>{
        this.$store.commit('setBasicStocks',response.data.map.value)
      })
    }
  },
  mounted(){
    this.queryBasicTables();
  }
}
</script>

<style>
  body {
    background-color: #fafafa;
  }
</style>

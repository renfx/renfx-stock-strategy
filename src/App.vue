<template>
  <div id="app">
    <transition :name='transitionName'>
      <router-view></router-view>
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

  }
}
</script>

<style>
  body {
    background-color: #fafafa;
  }

</style>

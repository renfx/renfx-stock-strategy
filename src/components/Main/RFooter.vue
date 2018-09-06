<template>
    <div>
      <van-tabbar v-model="active" fixed>
        <van-tabbar-item v-for="(value,key) in tabbars" :key="key">
          <span>{{value}}</span>
          <m-icon slot="icon" :type="key"/>
        </van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "r-footer",
      data(){
          return {
            active:this.index,
            tabbars:{
              "extension":"策略",
              "equalizer":"行情",
              "library_books":"财经",
            }
          }
      },
      props:['index']
    }
</script>

<style scoped>

</style>

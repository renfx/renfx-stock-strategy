<template>
    <div>
      <van-nav-bar title="标题" left-text="返回" left-arrow>
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          value:""
        }
      },
      methods:{
        onSearch:function(){

        }
      },
      name: "r-search"
    }
</script>

<style scoped>

</style>

<template>
    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="onCancel"
      >
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

        },
        onCancel(){
          this.$router.goBack()
        }
      },
      name: "r-search"
    }
</script>

<style scoped>

</style>

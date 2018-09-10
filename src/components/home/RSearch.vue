<template>
    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      >
      </van-search>
    </div>
</template>

<script>
    export default {
	  mounted(){
		this.drawLine();
	  },
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

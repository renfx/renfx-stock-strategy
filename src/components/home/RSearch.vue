<template>
    <div>
      <van-search
        class="fixed"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      >
      </van-search>
      <van-cell-group style="margin-top: 44px">
        <van-cell title="单元格" value="内容" is-link>
          <template slot="title">
            <span class="van-cell-text">单元格</span>
            <van-tag type="danger">标签</van-tag>
          </template>
        </van-cell>
        <van-cell title="单元格" value="内容" is-link/>
        <van-cell title="单元格" value="内容" is-link/>
        <van-cell title="单元格" value="内容" is-link/>
      </van-cell-group>

    </div>
</template>

<script>
    export default {
	  mounted(){
	  },
      data(){
        return {
          value:"",
          activeNames: ['1','2','3'],
          tabs:['股票','财经']
        }
      },
      methods:{
        onSearch:function(){

        },
        onCancel(){
          this.$router.goBack()
        },
        tabChange(){

        }
      },
      name: "r-search"
    }
</script>

<style scoped>
  .fixed {
    position: fixed;
    top: 0px;
    z-index: 99;
    width: 100%
  }
</style>

<template>
    <div>
      <van-search
        class="fixed"
        v-model="value"
        placeholder="搜索股票/新闻/策略"
        show-action
        @input="oninput"
        @search="onSearch"
        @cancel="onCancel"
      >
      </van-search>
      <van-cell-group style="margin-top: 44px">
        <!--<van-cell title="单元格" value="内容" is-link>-->
          <!--<template slot="title">-->
            <!--<span class="van-cell-text">单元格</span>-->
            <!--<van-tag type="danger">标签</van-tag>-->
          <!--</template>-->
        <!--</van-cell>-->
        <van-cell :key="index" v-for="(item,index) in matchs" :title="item.name" :value="item.code" is-link/>
      </van-cell-group>

    </div>
</template>

<script>
    export default {
	  mounted(){
	  },
      data(){
        return {
          matchs:[],
          value:"",
          activeNames: ['1','2','3'],
          tabs:['股票','财经']
        }
      },
      methods:{
        oninput(){
          console.log("111")
	        this.matchs=[];
          Object.values(this.$store.state.basicStocks).forEach(item=>{
            if(item.code.indexOf(this.value)>=0){
              this.matchs.push(item);
            }else{
              let convertPYs = this.$pyUtils.convertPYs(item.name);
              let match = this.$pyUtils.isMatch(this.value,convertPYs);
              if(match){
                this.matchs.push(item);
              }
            }

          })
        },
        onSearch:function(){
          // this.oninput();
        },
        onCancel(){
          console.log("222")
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

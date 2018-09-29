<template>
    <div>
      <van-search
        class="fixed"
        v-model="searchContent"
        placeholder="搜索股票"
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
        <van-cell :key="index" v-for="(item,index) in matchs"  is-link :to="'/back/stock?code='+item.code">
          <template slot="title">

            <van-row type="flex">
              <van-col span="4" class="all_center">
                <van-tag type="primary">{{item.area}}</van-tag>
              </van-col>
              <van-col span="6">
                <van-row type="flex">
                  <van-col span="24">
                    <span class="van-cell-text">{{item.name}}</span>
                  </van-col>
                  </van-row>
                <van-row type="flex">
                  <van-col span="24">
                    <span style="font-size:12px" class="van-cell-text">{{item.code}}</span>
                  </van-col>
                </van-row>
              </van-col>
              <van-col span="14"></van-col>
            </van-row>

          </template>
          <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon all_center" />
        </van-cell>
      </van-cell-group>
      <div v-if="matchs.length!=0" class="all_center" style="margin-top: 10px;margin-bottom: 10px;font-size:12px">
        最多显示10条数据
      </div>

    </div>
</template>

<script>
    export default {
	  mounted(){
	  },
      data(){
        return {
          matchs:[],
          searchContent:"",
        }
      },
      methods:{
        oninput(){
	        this.matchs=[];
          var searchContent = this.searchContent;
          if(searchContent=="") return;
          Object.values(this.$store.state.basicStocks).forEach(item=>{
            if(this.matchs.length>=10){
              return
            }
            if(item.code.indexOf(searchContent)>=0){
              this.matchs.push(item);
            }else{
              let convertPYs = this.$pyUtils.convertPYs(item.name);
              let match = this.$pyUtils.isMatch(searchContent,convertPYs);
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

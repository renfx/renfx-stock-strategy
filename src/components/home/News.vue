<template>
  <div>
    <r-header @tabChange="tabChange" :topTabs="topTabs"/>
    <van-pull-refresh style="margin-bottom: 56px; margin-top: 44px;"  v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="3000" class="van-hairline--bottom">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" >
        </van-swipe-item>
      </van-swipe>
      <van-list
        class="van-hairline--top"
        style="margin-top: 6px"
        v-model="loading"
        loading-text=" "
        :finished="finished"
        @load="onLoad"
      >
        <van-cell-group v-for="(item,index) in list" :key="index" class="list-cell-group">
          <van-cell :to="newsUrl(item)">
            <van-tag  type="primary" >{{item.classify}}</van-tag>
            <span style='font-weight: bold;'>【{{item.title}}】</span><span class="timeSpan">{{$dateUtils.formatDate(new Date(item.time),'yyyy-MM-dd hh:mm')}}</span>
          </van-cell>
          <van-cell :to="newsUrl(item)">
            <van-row>
              <van-col span="24" style="font-size: 12px">{{contentLong(item.content)}}</van-col>
            </van-row>
            <van-row>
              <van-col style="font-size: 12px;">

              </van-col>
            </van-row>

          </van-cell>
        </van-cell-group>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
    import RHeader from "./RHeader";

    export default {
      watch: {
        $route(to, from) {
          let title = to.params.tabName;
          if(title){
            this.selectTab(title)
          }
        }
      },
      mounted(){
        this.selectTab()
      },

      components: {
        RHeader},
      data(){
        return{
          topTabs: ['全部', '财经', '证券', '基金', '外汇', '期货', '美股'],
          list: [],
          whereList:[],
          page:{
            pageNo:1,
            pageSize:10,
            orderBy:'time',
            orderType:'desc',
            totalCount:0,
          },
          loading: false,
          isLoading: false,
          finished: false,
          activeNames: ['1'],
          images: [
            'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
            'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
            'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
            'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
          ]
        }
      },methods: {
        initQuery(){
          this.page.pageNo = 1;
          this.finished=false;
        },
        tabChange(index,title){
          this.$router.push('/library_books/'+title)
        },
        selectTab(title){
          if(!title || title=='全部' ||title==''){
            this.whereList=[]
          }else if(title=='财经'){
            this.whereList=[{"key":"classify","separator":"=","value":"国内"+title}]
          }else{
            this.whereList=[{"key":"classify","separator":"=","value":title}]
          }
          this.initQuery();
          this.query().then(response=>{
            this.list=response.data.map.select;
            this.page.totalCount = response.data.map.selectCount;
          })
        },
        newsUrl(row){
          let url = '../back/article?title='+encodeURI(row.title)+'&time='+this.$dateUtils.formatDate(new Date(row.time),'yyyy-MM-dd hh:mm:ss');
          return url;
        },

        defaultParam(){
          return {
            whereList:JSON.stringify(this.whereList),
            tableName:'latest_news',
            pageQuery:JSON.stringify(this.page),
          }
        },
        defaultHandle(response){
          this.list = this.list.length==0?response.data.map.select:(this.list.concat(response.data.map.select));
          this.page.totalCount = response.data.map.selectCount;
          let lastPage = parseInt(this.page.totalCount/this.page.pageSize);
          if(lastPage<=this.page.pageNo){
            this.finished = true;
          }
          this.page.pageNo +=1;
        },
        query(){
          return new Promise((resolve, reject) => {
            this.$api.post('basic/select-selectCount',this.defaultParam()).then(response=>{
              this.defaultHandle(response);
              resolve(response)
            })
          })
        },
        queryNoMsg(){
          return new Promise((resolve, reject) => {
            this.$api.postNoMsg('basic/select-selectCount',this.defaultParam()).then(response=>{
              this.defaultHandle(response);
              resolve(response)
            })
          })
        },
        contentLong(s){
          if(s && s.length>80){
            return s.substr(0,80)+"..."
          }
          return s;
        },
        onLoad() {
          this.query().then(response=>{
            this.loading = false;
          })
        },
        onRefresh(){
          setTimeout(() => {
            this.initQuery();
            this.queryNoMsg().then(response=>{
              this.isLoading = false;
              this.list=response.data.map.select;
              this.page.totalCount = response.data.map.selectCount;
            })
          }, 500);
        },
      },
    }
</script>

<style scoped>

  img {
    width: 100%;
    height: 240px;
    display: block;
    padding: 30px 60px;
    box-sizing: border-box;
    background-color: #fff;
    pointer-events: none;
  }
  .timeSpan{
    font-size: 12px;
    float: right;
    color: #959595
  }
  .list-cell-group{
  }
</style>

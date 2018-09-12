<template>
  <div >
    <van-cell-group  class="list-cell-group">
      <van-cell >
        <span style='font-weight: bold;'>【{{data.title}}】</span><span class="timeSpan">{{$dateUtils.formatDate(new Date(data.time),'yyyy-MM-dd hh:mm')}}</span>
      </van-cell>
      <van-cell >
        <van-row>
          <van-col span="24" style="font-size: 12px">{{data.content}}</van-col>
        </van-row>
        <van-row>
          <van-col style="font-size: 12px;">

          </van-col>
        </van-row>

      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
    export default {
      name: "r-article",
      mounted(){
        this.query();
      },
      data(){
        return{
          data:{}
        }
      },
      methods:{
        query(){
          let whereList = [
            {"key":"title","separator":"=","value":this.$route.query.title},
            {"key":"time","separator":"=","value":this.$route.query.time}
          ];
          let param = {
            tableName:'latest_news',
            whereList:JSON.stringify(whereList),
          }
          this.$api.post('basic/select',param).then(response=>{
            if(response.data.map.select){
              this.data = response.data.map.select[0];
            }
          })
        }
      },
    }
</script>

<style scoped>

</style>

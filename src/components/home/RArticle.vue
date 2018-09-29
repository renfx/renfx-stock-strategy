<template>
  <div >
    <van-cell-group  class="list-cell-group">
      <van-cell >
        <span style='font-weight: bold;font-size: 17px'>【{{data.title}}】</span>
        <br>
        <span class="timeSpan13">{{$dateUtils.formatDate(new Date(data.time),'yyyy-MM-dd hh:mm')}}
 来源：{{source}}
        </span>
      </van-cell>
      <van-cell >
        <van-row>
          <van-col span="24" style="font-size: 15px"><div v-html="data.content"></div></van-col>
        </van-row>
        <van-row>
          <van-col style="font-size: 15px;">

          </van-col>
        </van-row>

      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
    export default {
      name: "r-article",
      watch: {
        $route(to, from) {
          if(to.path=='/back/article'){
            this.query();
          }

        }
      },
      mounted(){
        this.query();
      },
      data(){
        return{
          data:{},
          source:"",
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
            var indexOf1 = this.data.content.indexOf(" ");
            var indexOf2 = this.data.content.indexOf("\n");
            let indexOf = indexOf1>indexOf2?indexOf2:indexOf1
            this.source = this.data.content.substring(0,indexOf);
            this.data.content = this.data.content.substring(indexOf,this.data.content.length);
              let content = "";
              for(let i=0;i<this.data.content.length;i++){
                var c = this.data.content.charAt(i);
                content+=c;
                if(c=="。" ){
                  content+='<br><div style="margin-top: 5px"/>';
                }
              }
              this.data.content=content;
            }
          })
        }
      },
    }
</script>

<style scoped>

</style>

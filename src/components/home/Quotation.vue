<template>
  <div>
    <r-header :topTabs="topTabs" @tabChange="tabChange"/>

    <r-candlestick code='sh' :showTitle="true" style="margin-top: 50px"/>
  </div>
</template>

<script>


  import RHeader from "./RHeader";
  import RCandlestick from "./RCandlestick";

    export default {
      mounted(){
        this.$emit('changeIndex',1)

      },
      components: {
        RCandlestick,
        RHeader},
      data(){
        return{
          topTabs: ['指数','自选', '个股'],
          list: [],
          loading: false,
          isLoading: false,
          finished: false,
          images: [
            'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
            'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
            'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
            'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
          ]
        }
      },methods: {
        tabChange(index,title){
          this.$router.push('/equalizer/'+title)
        },
        onLoad() {
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              this.list.push(this.list.length + 1);
            }
            this.loading = false;

            if (this.list.length >= 40) {
              this.finished = true;
            }
          }, 500);
        },
        onRefresh(){
          setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
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
</style>

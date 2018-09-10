<template>
  <div>
    <r-header/>
    <van-pull-refresh style="margin-bottom: 56px; margin-top: 44px;"  v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="3000" class="van-hairline--bottom">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" >
        </van-swipe-item>
      </van-swipe>
      <!--<van-list-->
        <!--class="van-hairline&#45;&#45;top"-->
        <!--style="margin-top: 6px"-->
        <!--v-model="loading"-->
        <!--:finished="finished"-->
        <!--@load="onLoad"-->
      <!--&gt;-->
        <!--<van-cell v-for="item in list" :key="item" :title="item + ''" />-->
      <!--</van-list>-->
    </van-pull-refresh>
  </div>
</template>

<script>
  var upColor = '#ec0000';
  var upBorderColor = '#8A0000';
  var downColor = '#00da3c';
  var downBorderColor = '#008F28';
    import RHeader from "./RHeader";

    export default {
      mounted(){
        this.$emit('changeIndex',1)
      },
      components: {RHeader},
      data(){
        return{
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

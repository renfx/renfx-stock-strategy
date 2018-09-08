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
	  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
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
		drawLine(){
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById('myChart'))
			// 绘制图表
			myChart.setOption({
				xAxis: {
					data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
				},
				yAxis: {},
				series: [{
					type: 'k',
					data: [
						[20, 30, 10, 35],
						[40, 35, 30, 55],
						[33, 38, 33, 40],
						[40, 40, 32, 42]
					]
				}]
			});
		},
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

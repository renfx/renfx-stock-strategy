<template>
    <div>
      <div id="myChart" style="width: 100%; height: 400px"></div>
    </div>
</template>

<script>


  const colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
  const labelFont = 'bold 12px Sans-serif';

  export default {
      name: "r-candlestick",
      mounted(){
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        this.query();
        window.addEventListener("orientationchange", function(event) {
          this.refreshChart()
        }, false);
      },
      methods:{
        getOption(){
          return {
            animation: false,
              color: colorList,
              title: {
              left: 'center',
                text: this.title
            },
            legend: {
              top: 30,
                data: ['日K', 'MA5', 'MA10', 'MA20']
            },
            tooltip: {
              triggerOn: 'none',
                transitionDuration: 0,
                confine: true,
                bordeRadius: 4,
                borderWidth: 1,
                borderColor: '#333',
                backgroundColor: 'rgba(255,255,255,0.9)',
                textStyle: {
                fontSize: 12,
                  color: '#333'
              },
              position: function (pos, params, el, elRect, size) {
                var obj = {
                  top: 60
                };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
              }
            },
            axisPointer: {
              link: [{
                xAxisIndex: [0, 1]
              }]
            },
            dataZoom: [{
              type: 'slider',
              xAxisIndex: [0, 1],
              realtime: false,
              start: this.dataZoomStart,
              end: this.dataZoomEnd,
              top: 65,
              height: 20,
              handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '120%'
            }, {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 40,
              end: 70,
              top: 30,
              height: 20
            }],
              xAxis: [{
              type: 'category',
              data: this.dates,
              boundaryGap : false,
              axisLine: { lineStyle: { color: '#777' } },
              axisLabel: {
                formatter: function (value) {
                  // return this.$echarts.format.formatTime('MM-dd', value);
                  return value;
                }
              },
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                show: true
              }
            }, {
              type: 'category',
              gridIndex: 1,
              data: this.dates,
              scale: true,
              boundaryGap : false,
              splitLine: {show: false},
              axisLabel: {show: false},
              axisTick: {show: false},
              axisLine: { lineStyle: { color: '#777' } },
              splitNumber: 20,
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                type: 'shadow',
                label: {show: false},
                triggerTooltip: true,
                handle: {
                  show: true,
                  margin: 30,
                  color: '#B80C00'
                }
              }
            }],
              yAxis: [{
              scale: true,
              splitNumber: 2,
              axisLine: { lineStyle: { color: '#777' } },
              splitLine: { show: true },
              axisTick: { show: false },
              axisLabel: {
                inside: true,
                formatter: '{value}\n'
              }
            }, {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: {show: false},
              axisLine: {show: false},
              axisTick: {show: false},
              splitLine: {show: false}
            }],
              grid: [{
              left: 20,
              right: 20,
              top: 110,
              height: 120
            }, {
              left: 20,
              right: 20,
              height: 40,
              top: 260
            }],
              graphic: [{
              type: 'group',
              left: 'center',
              top: 70,
              width: 300,
              bounding: 'raw',
              children: [{
                id: 'MA5',
                type: 'text',
                style: {fill: colorList[1], font: labelFont},
                left: 0
              }, {
                id: 'MA10',
                type: 'text',
                style: {fill: colorList[2], font: labelFont},
                left: 'center'
              }, {
                id: 'MA20',
                type: 'text',
                style: {fill: colorList[3], font: labelFont},
                right: 0
              }]
            }],
              series: [{
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: '#7fbe9e'
                },
                emphasis: {
                  color: '#140'
                }
              },
              data: this.volumes
            }, {
              type: 'candlestick',
              name: '日K',
              data: this.data,
              itemStyle: {
                normal: {
                  color: '#ef232a',
                  color0: '#14b143',
                  borderColor: '#ef232a',
                  borderColor0: '#14b143'
                },
                emphasis: {
                  color: 'black',
                  color0: '#444',
                  borderColor: 'black',
                  borderColor0: '#444'
                }
              }
            }, {
              name: 'MA5',
              type: 'line',
              data: this.dataMA5,
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            }, {
              name: 'MA10',
              type: 'line',
              data: this.dataMA10,
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            }, {
              name: 'MA20',
              type: 'line',
              data: this.dataMA20,
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            }]
          }
        },
        refreshChart(){
          this.myChart.setOption(this.getOption());//echarts重绘
          this.myChart.on('datazoom',param=>{
            if(param.start<5 && this.hasData){
              this.dataZoomStart = param.start;
              this.dataZoomEnd = param.end;
              this.query()
            }
          })
        },
        queryParam(){
          let whereList=[
            {"key":"code","separator":"=","value":this.code},
            {"key":"date","separator":"<=","value":this.endDate},
            {"key":"date","separator":">","value":this.beginDate},
          ]
          let pageQuery={
            orderBy:'date',
            orderType:'asc'
          }
          let param = {
            whereList:JSON.stringify(whereList),
            tableName:'his_data',
            pageQuery:JSON.stringify(pageQuery)
          }
          return param;
        },
        query(){
          this.myChart.showLoading();
          this.$api.postNoMsg('basic/select',this.queryParam()).then(response=>{
            this.endDate = this.beginDate;
            this.beginDate = this.$dateUtils.beforeNowDays(new Date(this.beginDate),365);
            let list = response.data.map.select
            let dataTemp=[], datesTemp=[],volumesTemp=[],dataMA5Temp=[], dataMA10Temp=[],dataMA20Temp=[];
            let stockName='';
            Object.values(list).forEach((v,i)=>{
              dataTemp.push([v.open,v.close,v.low,v.high,v.volume])
              datesTemp.push(v.date)
              volumesTemp.push(v.volume)
              dataMA5Temp.push(v.ma5)
              dataMA10Temp.push(v.ma10)
              dataMA20Temp.push(v.ma20)
              if(stockName==''){
                stockName = v.name;
              }
            })
            if(this.showTitle){
              this.title=stockName
            }
            this.$emit('stockName',stockName)
            let beforeLength = this.data.length;
            let newLength = dataTemp.length;
            if(beforeLength!=0){
              let newPercent = newLength/(newLength+beforeLength)*100
              this.dataZoomStart+=newPercent;
              this.dataZoomEnd+=newPercent;
            }
            this.data = dataTemp.concat(this.data)
            this.dates = datesTemp.concat(this.dates)
            this.volumes = volumesTemp.concat(this.volumes)
            this.dataMA5 = dataMA5Temp.concat(this.dataMA5)
            this.dataMA10 = dataMA10Temp.concat(this.dataMA10)
            this.dataMA20 = dataMA20Temp.concat(this.dataMA20)
            this.refreshChart();
            this.myChart.hideLoading();
            this.$api.postNoMsg('basic/selectCount',this.queryParam()).then(response=>{
              let count = response.data.map.selectCount;
              if(count==0){
                this.hasData = false;
              }
            })
          })
        },
        calculateMA(dayCount, data) {
          var result = [];
          for (var i = 0, len = data.length; i < len; i++) {
            if (i < dayCount) {
              result.push('-');
              continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
              sum += data[i - j][1];
            }
            result.push((sum / dayCount).toFixed(2));
          }
          return result;
        },
      },
      data(){
        return{
          beginDate:this.$dateUtils.beforeNowDays(new Date(),365),
          endDate:this.$dateUtils.formatDate(new Date(),'yyyy-MM-dd'),
          dates:[],
          data:[],
          volumes:[],
          dataMA5:[],
          dataMA10:[],
          dataMA20:[],
          title:'',
          myChart:{},
          dataZoomStart:90,
          dataZoomEnd:100,
          hasData:true,
        }
      },

      props:['code','showTitle']
    }




</script>

<style scoped>

</style>

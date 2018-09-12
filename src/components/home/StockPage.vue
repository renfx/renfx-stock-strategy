<template>
    <div>
      <r-candlestick @stockName="stockName" :code='this.$route.query.code' style="margin-top: 50px"/>
    </div>
</template>

<script>
    import RCandlestick from "./RCandlestick";

    export default {
      components: {RCandlestick},
      mounted(){
      },
      methods:{
        stockName(stockName){
          this.$emit('setTitle',stockName);
        }
      },
        name: "stock-page"
    }
</script>

<style scoped>

</style>

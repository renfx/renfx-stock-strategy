<template>
    <div >
      <i class="material-icons" :style="styles">{{type}}</i>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          styles:'font-size:'+this.size+'px;color:'+this.color
        }
      },
      name: "material-icon",
      props:['type','size','color']
    }
</script>

<style scoped>
  .text-center{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
</style>

<template>
  <div>
    <router-view/>

    <van-tabbar v-model="index">
      <van-tabbar-item v-for="(value,key) in tabbars" :key="key" :to="'../'+key">
        <span>{{value}}</span>
        <m-icon slot="icon" :type="key"/>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

  export default {
    mounted() {
      this.selectTabber();
    },
    data() {
      return {
        index: 0,
        tabbars: {
          "extension": "策略",
          "equalizer": "行情",
          "library_books": "财经",
        }
      }
    },
    components: {},
    methods: {
      selectTabber() {
        let path = this.$route.path.replace("/", "");
        Object.keys(this.tabbars).forEach((key, index) => {
          if (path.indexOf(key)==0) {
            this.index = index;
          }
          if (path == "") {
            this.index = 2;
          }
        });

      }
    },

    name: "r-main"
  }
</script>

<style scoped>

</style>

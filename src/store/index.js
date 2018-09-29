import vue from 'vue'
import  Vuex from 'vuex'
vue.use(Vuex)
export default new Vuex.Store({
  state: {
    basicStocks: [],
    // findOnBasicStock(code){
    //
    // }
  },
  mutations: {
    setBasicStocks (state,basicStocks) {
      state.basicStocks = basicStocks;
    },
  }
})

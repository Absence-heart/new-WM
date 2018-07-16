import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log(Vuex.Store)
export default new Vuex.Store({
  state: {
    flag: false,
    goods: [],
    food: null,
    selectFood: [],
    totalCount: 0,
    totalPrice: 0
  }
})

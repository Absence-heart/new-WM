import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log(Vuex.Store)
export default new Vuex.Store({
  state: {
    flag: true,
    goods: [],
    food: null,
    selectFood: [],
    totalCount: 0,
    totalPrice: 0
  },
  mutations: {
    // selectFood () {
    //   if (this.goods.length !== 0) {
    //     this.goods.forEach(good => {
    //       good.foods.forEach(food => {
    //         if (food.count) {
    //           foods.push(food)
    //         }
    //       })
    //     })
    //   }
    //   return foods
    // }
  }
})

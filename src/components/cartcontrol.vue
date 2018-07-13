<template>
  <div class="cart-control">
      <span class="decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop="remove"></span>
      <span class="count" v-show="food.count > 0">{{food.count}}</span>
      <span class="increase icon-add_circle" @click.stop="add"></span>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      msg: 'hi'
    }
  },
  methods: {
    add (event) {
      if (event._constructed) {
        if (!this.food.count) {
          Vue.set(this.food, 'count')
          this.food.count = 1
        } else {
          this.food.count++
        }
      }
    },
    remove (event) {
      if (event._constructed) {
        if (this.food.count === 0) {
          return
        }
        this.food.count--
      }
    }
  }
}
</script>
<style lang="stylus">
.cart-control
  font-size 0
  .icon-remove_circle_outline,
  .icon-add_circle
    display inline-block
    width 24px
    height 24px
    line-height 24px
    font-size 24px
  .decrease,
  .increase
    padding 6px
    display inline-block
    line-height 24px
    color #00a0dc
    font-size 24px
  .count
    display inline-block
    text-align center
    width 12px
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    padding-top 6px
    vertical-align top
</style>

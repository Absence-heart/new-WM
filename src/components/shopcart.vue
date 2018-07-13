<template>
  <div class="shopcart">
    <div class="content">
      <div class="chart-icon-wrapper" @click="goList">
        <div class="chart-icon icon-shopping_cart" :class="{noChart: totalCount != 0}"></div>
        <div class="total-count" v-show="totalCount != 0">{{totalCount}}</div>
      </div>
      <div class="deliver-fee" @click="goList">
        <div class="price border-1px-right" :class="{noPrice: totalPrice != 0}">￥{{totalPrice}}</div>
        <div class="deliverPrice">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="deliver-base" :class="{ok: totalPrice >= 20}">{{imform}}</div>
    </div>
    <div class="cart-list-wrapper" v-show="showList">
      <div class="cart-gray" @click="goList"></div>
      <div class="cart-list"  ref="cartScroll" :class="{fixedLength: lengthFixed}">
        <div>
          <div class="cart-list-header">
            <span class="cart-title">购物车</span><span class="clear" @click="clearAll">清空</span>
          </div>
          <div class="food-item" v-for="food in selectFoods" :key="food.id">
            <span class="food-title">{{food.name}}</span>
            <span class="food-price">`￥{{food.price}}`</span>
            <cartcontrol class="cart-control" :food="food"></cartcontrol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from './cartcontrol'

export default {
  name: 'shopcart',
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            count: 10,
            price: 2
          },
          {
            count: 1,
            price: 20
          }
        ]
      }
    }
  },
  updated () {
    Vue.nextTick(() => {
      this._initScroll()
    })
  },
  data () {
    return {
      fold: true
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    goList () {
      if (!this.selectFoods.length) {
        return
      }
      this.fold = !this.fold
    },
    clearAll () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    _initScroll () {
      if (this.lengthFixed) {
        this.scroll = new BScroll(this.$refs.cartScroll, {
          click: true,
          mouseWheel: true
        })
      }
    }
  },
  computed: {
    totalCount () {
      let totalCount = 0
      this.selectFoods.forEach((food) => {
        totalCount += food.count
      })
      return totalCount
    },
    totalPrice () {
      let totalPriceNum = 0
      this.selectFoods.forEach((food) => {
        totalPriceNum += food.price * food.count
      })
      return totalPriceNum
    },
    imform () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}`
      } else if (this.totalPrice > 0 && this.totalPrice < 20) {
        return `还差￥${20 - this.totalPrice}`
      } else {
        return `去结算`
      }
    },
    showList () {
      if (!this.totalCount) {
        return false
      }
      return !this.fold
    },
    lengthFixed () {
      if (this.selectFoods.length >= 5) {
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import "../assets/stylus/index.styl"
@import "../../static/style.css"

  .shopcart
    position: fixed
    width 100%
    height 48px
    bottom 0
    left 0
    z-index 300
    .content
      width 100%
      display flex
      background #141d27
      .chart-icon-wrapper
        flex 0 0 80px
        position relative
        .chart-icon
          position relative
          width 44px
          height 44px
          border-radius 44px
          border 6px solid #141d27
          background-color #2b333b
          margin-left 18px
          margin-top -10px
          font-size 24px
          color rgba(255,255,255,0.4)
          line-height 44px
          text-align center
          &.noChart
            background-color #00a0dc
            color #ffffff
        .total-count
          position absolute
          right 0
          top -6px
          text-align center
          background-color red
          color #ffffff
          width 24px
          height 16px
          font-size 8px
          font-weight 700
          line-height 16px
          box-shadow 4 4px 8px 0 rgba(0,0,0,0.4)
          border-radius 16px
    .deliver-fee
      flex 1
      padding 12px 0 12px 12px
      height 24px
      .price
        display inline-block
        line-height 24px
        padding-right 12px
        color rgba(255,255,255,0.2)
        border-1px-right rgba(255,255,255,0.4)
        &.noPrice
          color #ffffff
      .deliverPrice
        display inline-block
        padding-left 12px
        font-size 12px
        color rgba(255,255,255,0.4)
        line-height 20px
        font-weight 700
    .deliver-base
      flex 0 0 20%
      padding 0 8px
      line-height 48px
      font-size 12px
      text-align center
      color rgba(255,255,255,0.1)
      font-weight 700
      background-color #2b333b
      &.ok
        background-color green
        color #ffffff
    .cart-list-wrapper
      position fixed
      top 0
      bottom 48px
      width 100%
      display flex
      flex-direction column
      z-index -1
      .cart-gray
        flex 1
        background-color rgba(7,17,27,0.6)
      .cart-list
        width 100%
        line-height 40px
        padding 0 18px
        border-1px(rgba(7,17,27,0.6))
        background-color #f3f5f7
        &.fixedLength
          height 240px
          overflow hidden
        .cart-title
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
        .clear
          position absolute
          right 58px
          font-size 12px
          color rgb(0,160,220)
      .food-item
        width 100%
        height 48px
        line-height 48px
        margin 0 18px
        border-1px(rgba(7,17,27,0.1))
        .food-title
          font-size 14px
          color rgb(7,17,27)
        .food-price
          position absolute
          color rgb(240,20,20)
          right 150px
          font-size 10px
        .cart-control
          position absolute
          right 58px
          top 6px
          display inline-block
</style>

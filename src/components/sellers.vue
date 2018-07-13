<template>
    <div id="sellers">
        <div class="seller-title">
          <div class="shop-info border-1px">
            <div class="shop-name">
              <span class="name">{{seller.name}}</span>
              <ratingstars :score="score = seller.score"></ratingstars>
              <span class="sell-count">月售{{seller.sellCount}}</span>
            </div>
            <div class="islike">
              <span class="icon-favorite"></span>
              <span>已收藏</span>
            </div>
          </div>
          <div class="shop-comfirm">
            <div class="border-1px-right"><span class="mark">起送价</span><span class="num">{{seller.minPrice}}</span><span class="unit">元</span></div>
            <div class="border-1px-right"><span class="mark">商家配送</span><span class="num">{{seller.deliveryPrice}}</span><span class="unit">元</span></div>
            <div><span class="mark">平均配送时间</span><span class="num">{{seller.deliveryTime}}</span><span class="unit">分钟</span></div>
          </div>
        </div>
        <div class="blank"></div>
        <div class="seller-notice">
          <div class="notice-text border-1px">
            <span class="n-title">公告与活动</span>
            <span class="n-text">{{seller.bulletin}}</span>
          </div>
          <ul>
            <li class="promotion border-1px" v-for="(item,index) in seller.supports" :key="index" :class="classMap[item.type]">
              <span class="p-desc">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="blank"></div>
        <div class="seller-pic">
          <span class="p-title">商家实景</span>
          <ul>
            <li class="show-pic" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" alt="">
            </li>
          </ul>
        </div>
        <div class="blank"></div>
        <div class="seller-info">
          <ul>
            <li class="i-title border-1px">商家信息</li>
            <li class="infos border-1px" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
          </ul>
        </div>
    </div>
</template>

<script>
import ratingstars from './ratingstars'
export default {
  name: 'sellers',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      scal: false
    }
  },
  components: {
    ratingstars
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import "../assets/stylus/index.styl"
@import "../../static/style.css"
#sellers
  position absolute
  top 174px
  left 0
  right 0
  width 100%
  .seller-title
    padding 18px
    .shop-info
      position relative
      display flex
      flex-direction row
      border-1px(rgba(7,17,27,0.1))
      .shop-name
        flex 0 0 67%
        padding-bottom 18px
        .name
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .stars-wrapper
          display inline-block
          margin-top 8px
          margin-right 8px
          vertical-align bottom
        .sell-count
          font-size 10px
          color rgb(77,85,93)
          line-height 18px
      .islike
        flex 1
        display flex
        flex-direction column
        position absolute
        right 0
        bottom 18px
        text-align center
        .icon-favorite
          font-size 24px
          color rgb(240,20,20)
          line-height 24px
          margin-bottom 4px
        span
          font-size 10px
          color rgb(77,85,93)
          line-height 10px
    .shop-comfirm
      padding-top 18px
      display flex
      flex-direction row
      text-align center
      .border-1px-right
        border-1px-right(rgba(7,17,27,0.1))
      div
        flex 1
        .mark
          display block
          font-size 10px
          color rgb(147,153,159)
          margin-bottom 4px
        .num
          font-size 20px
          font-weight 200
          color rgb(7,17,27)
          line-height 24px
        .unit
          font-size 10px
          font-weight 200
          color rgb(7,17,27)
          line-height 24px
  .blank
    width 100%
    height 18px
    background-color rgba(7,17,27,0.1)
    border-top 1px solid rgba(7,17,27,0.1)
    border-bottom 1px solid rgba(7,17,27,0.1)
  .seller-notice
    padding 18px 18px 0
    .notice-text
      padding-bottom 16px
      border-1px(rgba(7,17,27,0.1))
      span
        display block
      .n-title
        font-size 16px
        font-weight 500
      .n-text
        font-size 12px
        line-height 24px
        padding 12px 12px 0
        font-weight 200
        color rgb(240,20,20)
    ul
      .promotion
        border-1px(rgba(7,17,27,0.1))
        font-size 12px
        padding 12px 16px
        font-weight 200
        color rgb(7,17,27)
        line-height 16px
        background-size 18px 18px
        background-position left 12px center
        .p-desc
            margin-left 18px
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
  .seller-pic
    padding 18px
    .p-title
      font-size 16px
      font-weight 500
    ul
      height 90px
      overflow hidden
      .show-pic
        display inline-block
        width 120px
        height 90px
        background-color red
        margin-right 6px
        margin-top 12px
        img
          width 100%
          height 100%
  .seller-info
    padding 18px
    ul
      .i-title
        font-size 16px
        font-weight 500
        border-1px(rgba(7,17,27,0.1))
        padding-bottom 12px
      .infos
        padding 12px 16px
        border-1px(rgba(7,17,27,0.1))
        font-size 12px
        font-weight 200
        color rgb(7,17,27)
        line-height 16px
</style>

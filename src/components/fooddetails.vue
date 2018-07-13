<template>
  <div id="foods" v-if="flag">
    <div class="wrapper">
      <div class="food-pic">
        <img :src="food.image" alt="">
        <div class="return" @click.stop="getBack">返回</div>
      </div>
      <div class="food-name-wrapper">
        <div class="food-name">
          <p class="name">{{food.name}}</p>
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rate">好评率{{food.rating}}</span>
        </div>
        <div class="food-get">
          <span class="unit">￥</span>
          <span class="price">{{food.price}}</span>
          <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          <span class="add" @click="addToCart">加入购物车</span>
        </div>
      </div>
      <div class="blank"></div>
      <div class="food-intro">
        <span class="title">商品介绍</span>
        <p class="text">{{food.info}}</p>
      </div>
      <div class="blank"></div>
      <div class="rating-mark-wrapper border-1px border-1px-top">
          <span class="title">商品评价</span>
          <div class="rating-mark border-1px">
            <div class="mark" style="backgroundColor: rgb(0,160,220); color: rgb(255,255,255)"><span>全部</span><span class="mark-num">{{rateCount}}</span></div>
            <div class="mark" style="backgroundColor: rgba(0,160,220,0.2); color: rgb(77,85,93)"><span>满意</span><span class="mark-num">{{likeCount}}</span></div>
            <div class="mark" style="backgroundColor: rgba(77,85,93,0.2); color: rgb(77,85,93)"><span>吐槽</span><span class="mark-num">{{dislikeCount}}</span></div>
          </div>
          <div class="scan-mark">
            <span class="icon-check_circle"></span><span>只显示有评价的内容</span>
          </div>
        </div>
      <ul class="comment">
        <li class="comment-wrapper border-1px" v-for="item in food.ratings" :key="item.name">
          <div class="c-top">
            <span class="rate-time">{{rateTime}}</span>
            <span class="user-name">{{item.username}}</span>
            <img :src="item.avatar" class="user-avatar">
          </div>
          <span class="icon-thumb_up" v-show="item.rateType === 0"></span>
          <span class="icon-thumb_down" v-show="item.rateType === 1"></span>
          <span class="text">{{item.text}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
  props: {
    food: {
      type: Object
    },
    selectFood: {
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
  mounted () {
    this._scroll()
  },
  methods: {
    _scroll () {
      console.log(document.querySelectorAll('#foods'))
      this.foodScroll = new BScroll(document.querySelectorAll('.wrapper')[0], {
        click: true
      })
    },
    addToCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count')
        this.food.count = 1
      }
    },
    getBack () {
      this.$store.state.flag = false
    }
  },
  computed: {
    ...mapState(['flag']),
    rateTime () {
      var rateTime
      this.food.ratings.forEach((item) => {
        var newRateTime = new Date(item.rateTime)
        rateTime = `${newRateTime.getFullYear()}-${newRateTime.getMonth()}-${newRateTime.getDate()} ${newRateTime.getHours()}:${newRateTime.getMinutes()}:${newRateTime.getSeconds()}`
      })
      return rateTime
    },
    likeRate () {
      let like = []
      this.food.ratings.forEach((item) => {
        if (item.rateType === 0) {
          like.push(item)
        }
      })
      return like
    },
    dislikeRate () {
      let dislike = []
      this.food.ratings.forEach((item) => {
        if (item.rateType === 1) {
          dislike.push(item)
        }
      })
      return dislike
    },
    rateCount () {
      return this.food.ratings.length
    },
    likeCount () {
      var likeCount = 0
      this.food.ratings.forEach((item) => {
        if (item.rateType === 0) {
          likeCount += 1
        }
      })
      return likeCount
    },
    dislikeCount () {
      var dislikeCount = 0
      this.food.ratings.forEach((item) => {
        if (item.rateType === 1) {
          dislikeCount += 1
        }
      })
      return dislikeCount
    }
  }
}
</script>
<style lang="stylus">
@import "../../static/style.css"
@import "../assets/stylus/index.styl"
#foods
  z-index 3
  position fixed
  right 0
  top 0
  left 0
  bottom 48px
  background-color #ffffff
  .blank
    width 100%
    height 16px
    background-color rgba(77,85,93,0.1)
    border-top 1px solid rgba(77,85,93,0.1)
    border-bottom 1px solid rgba(77,85,93,0.1)
  .food-pic
    width 100%
    height 275px
    img
      width 100%
      height 100%
    .return
      position absolute
      left 0
      top 0
      width 60px
      height 30px
      background-color gray
      color #ffffff
      text-align center
      line-height 30px
  .food-name-wrapper
    padding 18px
    .name
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
    .sell-count
    .rate
      font-size 10px
      color rgb(147,153,159)
      line-height 10px
      margin-right 10px
    .food-get
      padding-top 18px
      position relative
      font-size 0
      .unit
        font-size 10px
        font-weight normal
      .price
        font-size 14px
        font-weight 700
        margin-right 6px
      .unit
      .price
        color rgb(240,20,20)
        line-height 24px
      .old-price
        font-size 10px
        font-weight normal
        color rgb(147,153,159)
        line-height 24px
        text-decoration line-through
      .add
        display inline-block
        position absolute
        right 0px
        width 74px
        height 24px
        text-align center
        border-radius 12px
        background-color rgb(0,160,220)
        font-size 10px
        color rgb(255,255,255)
        line-height 24px
  .food-intro
    padding 18px
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
    .text
      margin-top 6px
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
  .rating-mark-wrapper
    padding 18px 18px 12px
    border-1px(rgba(7,17,27,0.1))
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
    .rating-mark
      padding-bottom 18px
      border-1px(rgba(7,17,27,0.1))
      .mark
        display inline-block
        border-radius 2px
        margin-right 8px
        padding 4px 6px
        margin-top 18px
        span
          text-align center
          line-height 16px
          margin-right 2px
        .mark-num
          font-size 8px
          line-height 6px
    .scan-mark
      margin-top 12px
      span
        display inline-block
        text-align center
        font-size 12px
        color rgb(147,153,159)
        line-height 24px
      .icon-check_circle
        margin-right 4px
        font-size 24px
        line-height 24px
        vertical-align middle
  .comment
    padding 18px
    .comment-wrapper
      border-1px(7,17,27,0.1)
      .c-top
        position relative
        .rate-time
        .user-name
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
        .user-name
          position absolute
          right 18px
          margin-right 6px
        .user-avatar
          position absolute
          right 0
          display inline-block
          width 12px
          height 12px
          border-radius 50%
      .icon-thumb_up
      .icon-thumb_down
        font-size 12px
        line-height 24px
        vertical-align middle
      .icon-thumb_up
        color rgb(0,160,220)
      .text
        font-size 12px
        color rgb(7,17,27)
        line-height 16px
</style>

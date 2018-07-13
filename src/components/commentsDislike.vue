<template>
  <div class="comment">
    <ul>
      <li v-for="(item,index) in dislikeRate" :key="index" class="rating-msg-item border-1px">
        <div class="user-avatar">
          <img :src="item.avatar" alt="">
        </div>
        <div class="msg-wrapper">
          <div class="m-top">
            <span class="user-name">{{item.username}}</span><span class="rating-time">{{rateTime}}</span>
          </div>
          <ratingstars :score="score = item.score"></ratingstars>
          <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
          <div class="text">{{item.text}}</div>
          <div class="rating-type">
            <span class="icon-thumb_up" v-show="item.rateType === 0"></span>
            <span class="icon-thumb_down" v-show="item.rateType === 1"></span>
            <ul class="recommend" v-for="(food,index) in item.recommend" :key="index">
              <li class="r-food">{{food}}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import ratingstars from './ratingstars'
export default {
  props: {
    dislikeRate: {
      type: Array
    }
  },
  components: {
    ratingstars
  },
  computed: {
    rateTime () {
      var rateTime
      this.dislikeRate.forEach((item) => {
        var newRateTime = new Date(item.rateTime)
        rateTime = `${newRateTime.getFullYear()}-${newRateTime.getMonth()}-${newRateTime.getDate()} ${newRateTime.getHours()}:${newRateTime.getMinutes()}:${newRateTime.getSeconds()}`
      })
      return rateTime
    }
  }
}
</script>
<style lang="stylus">
@import "../../static/style.css"
@import "../assets/stylus/index.styl"
.comment
  padding 0 18px 18px
  .rating-msg-item
    display flex
    flex-direction row
    padding-top 18px
    padding-bottom 18px
    border-1px(rgba(7,17,27,0.1))
    .user-avatar
      flex 0 0 28px
      width 28px
      height 28px
      margin-right 12px
      img
        width 100%
        height 100%
        border-radius 50%
    .msg-wrapper
      flex 1
      .user-name
        font-size 10px
        color rgb(7,17,27)
        line-height 12px
        margin-bottom 4px
      .rating-time
        float right
      .deliveryTime
      .rating-time
        font-size 10px
        font-weight 200
        color rgb(147,153,159)
        line-height 12px
      .stars-wrapper
        display inline-block
        bg-img('star36_on')
        margin-right 6px
        vertical-align middle
      .text
        font-size 12px
        line-height 18px
        margin-top 6px
        margin-bottom 8px
        color rgb(7,17,27,)
      .rating-type
        .icon-thumb_up
          font-size 12px
          color rgb(0,160,220)
          line-height 18px
        .icon-thumb_down
          font-size 12px
          color rgb(183,187,191)
          line-height 18px
        .recommend
          margin-right 8px
          display inline-block
          vertical-align bottom
          .r-food
            width 40px
            border 1px solid rgba(7,17,27,0.1)
            border-radius 2px
            font-size 9px
            color rgb(147,153,159)
            line-height 16px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
</style>

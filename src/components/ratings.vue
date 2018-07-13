<template>
  <div id="ratings" ref="ratingWrapper">
    <div class="rating-wrapper border-1px">
      <div class="average-rating border-1px-right">
        <span class="average-score">{{seller.score}}</span>
        <span class="score-title">综合评分</span>
        <span class="score-desc">高于周边商家{{seller.rankRate}}%</span>
      </div>
      <div class="rating-desc">
        <div class="service-rating">
          <span class="title">服务态度</span>
          <ratingstars :score="score = Math.round(seller.serviceScore)"></ratingstars>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="deliver-rating">
          <span class="title">食物评分</span>
          <ratingstars :score="score = Math.round(seller.foodScore)"></ratingstars>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="deliver-time"><span class="title">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span></div>
      </div>
    </div>
    <div class="msgrating">
      <div class="blank"></div>
      <div class="rating-mark-wrapper border-1px border-1px-top">
        <div class="rating-mark border-1px">
          <router-link tag="div" to="/ratings/all" class="mark" style="backgroundColor: rgb(0,160,220); color: rgb(255,255,255)"><span>全部</span><span class="mark-num">{{seller.ratingCount}}</span></router-link>
          <router-link tag="div" to="/ratings/like" class="mark"  style="backgroundColor: rgba(0,160,220,0.2); color: rgb(77,85,93)"><span>满意</span><span class="mark-num">{{likeCount}}</span></router-link>
          <router-link tag="div" to="/ratings/dislike" class="mark" style="backgroundColor: rgba(77,85,93,0.2); color: rgb(77,85,93)"><span>吐槽</span><span class="mark-num">{{dislikeCount}}</span></router-link>
        </div>
        <div class="scan-mark">
          <span class="icon-check_circle"></span><span>只显示有内容的评价</span>
        </div>
      </div>
      <router-view :ratings="ratings" :likeRate="likeRate" :dislikeRate="dislikeRate"></router-view>
    </div>
  </div>
</template>

<script>
import ratingstars from './ratingstars'
import shopcart from './shopcart'
import axios from 'axios'
export default {
  name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      is: 0,
      ratings: []
    }
  },
  created () {
    axios.get('/good/ratings').then(res => {
      if (res.data.code === 0) {
        this.ratings = res.data.data
      }
    })
  },
  components: {
    ratingstars,
    shopcart
  },
  computed: {
    likeRate () {
      let like = []
      this.ratings.forEach((item) => {
        if (item.rateType === 0) {
          like.push(item)
        }
      })
      return like
    },
    dislikeRate () {
      let dislike = []
      this.ratings.forEach((item) => {
        if (item.rateType === 1) {
          dislike.push(item)
        }
      })
      return dislike
    },
    likeCount () {
      var likeCount = 0
      this.ratings.forEach((item) => {
        if (item.rateType === 0) {
          likeCount += 1
        }
      })
      return likeCount
    },
    dislikeCount () {
      var dislikeCount = 0
      this.ratings.forEach((item) => {
        if (item.rateType === 1) {
          dislikeCount += 1
        }
      })
      return dislikeCount
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import "../../static/style.css"
@import "../assets/stylus/index.styl"
  #ratings
    position absolute
    top 174px
    left 0
    right 0
    width 100%
    .rating-wrapper
      display flex
      flex-direction row
      padding 18px 0
      border-1px(rgba(7,17,27,0.1))
      .average-rating
        flex 0 0 35%
        display flex
        text-align center
        flex-direction column
        border-1px-right(rgba(7,17,27,0.1))
        .average-score
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
          font-weight bold
        .score-title
          margin-top 6px
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
          font-weight 700
        .score-desc
          margin-top 8px
          margin-bottom 6px
          font-size 10px
          color rgb(7,17,27)
          line-height 10px
      .rating-desc
        padding 0 24px
        .service-rating
        .deliver-rating
        .deliver-time
          display flex
          flex-direction row
          font-size 12px
          line-height 18px
          font-weight 700
          .title
            color rgb(7,17,27)
            margin-right 12px
          .score
            color rgb(255,153,0)
            margin-left 12px
        .deliver-rating
          margin-top 8px
        .deliver-time
          margin-top 8px
          .time
            color rgb(147,153,159)
    .msgrating
      .blank
        width 100%
        height 16px
        background-color rgba(77,85,93,0.1)
      .rating-mark-wrapper
        padding 18px 18px 12px
        border-1px(rgba(7,17,27,0.1))
        .rating-mark
          padding-bottom 18px
          border-1px(rgba(7,17,27,0.1))
          .mark
            display inline-block
            border-radius 2px
            margin-right 8px
            padding 8px 12px
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
</style>

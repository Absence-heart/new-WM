<template>
  <div class="stars-wrapper">
    <span class="icon" :class="{starOn: score >= 1}"></span>
    <span class="icon" :class="{starOn: score >= 2}"></span>
    <span class="icon" :class="{starOn: score >= 3}"></span>
    <span class="icon" :class="{starOn: score >= 4}"></span>
    <span class="icon" :class="{starOn: score >= 5}"></span>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number
    }
  }
}
</script>
<style lang="stylus">
@import "../assets/stylus/index.styl"
@import "../../static/style.css"
.stars-wrapper
  .icon
    display inline-block
    width 16px
    height 16px
    background url('../assets/images/star24_off@2x.png')
    background-size 16px 16px
    &.starOn
      display inline-block
      width 16px
      height 16px
      background url('../assets/images/star24_on@2x.png')
      background-size 16px 16px
</style>

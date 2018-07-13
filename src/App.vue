<template>
  <div id="app">
    <headers :seller = "seller"></headers>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path: '/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/sellers'}">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller = "seller"></router-view>
    </div>
  </div>
</template>

<script>
import headers from './components/headers'
import goods from './components/goods'
import ratings from './components/ratings'
import axios from 'axios'
import shopcart from './components/shopcart'

export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    headers,
    goods,
    ratings,
    shopcart
  },
  created () {
    axios.get('/good/seller').then(res => {
      if (res.data.code === 0) {
        this.seller = res.data.data
      }
    })
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylelus">
  @import 'assets/stylus/index.styl'
  #app
    .tab
      display flex
      height 40px
      line-height 40px
      border-1px(rgba(240,20,20,0.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77,85,93)
        a
          display block
          width 100%
          height 100%
        .router-link-exact-active
          color rgb(240, 20,20) !important
</style>

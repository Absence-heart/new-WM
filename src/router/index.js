import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods'
import ratings from '@/components/ratings'
import sellers from '@/components/sellers'
import comments from '@/components/comments'
import commentsLike from '@/components/commentsLike'
import commentsDislike from '@/components/commentsDislike'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: goods
    }, {
      path: '/goods',
      name: 'goods',
      component: goods,
      meta: {
        index: 1
      }
    }, {
      path: '/ratings',
      component: ratings,
      meta: {
        index: 2
      },
      children: [
        {
          path: '/',
          name: 'all',
          component: comments
        },
        {
          path: 'all',
          component: comments
        }, {
          path: 'like',
          name: 'like',
          component: commentsLike
        }, {
          path: 'dislike',
          name: 'dislike',
          component: commentsDislike
        }
      ]
    }, {
      path: '/sellers',
      name: 'sellers',
      component: sellers,
      meta: {
        index: 3
      }
    }
  ]
})

<template>
  <div id="app">
    <!--<transition :name="transitionName">-->
      <!--<keep-alive>-->
        <!--<router-view ></router-view>-->
      <!--</keep-alive>-->
    <!--</transition>-->

    <transition :name="transitionName">
      <keep-alive exclude="UserOrder,OrderDetail">
        <router-view class="router-view" ></router-view>
      </keep-alive>
    </transition>


    <Loading v-if="$root.$data.loading"></Loading>
  </div>
</template>

<script>
import Loading from 'components/loading.vue'
import { getUser } from '@/api/user'

export default {
  name: 'App',
  components: {
    Loading
  },
  data() {
    return {
      transitionName: ''
    }
  },
  methods: {
    /**
     * 检查登录状态
     */
    checkLogin(to, from) {
      if (!this.getCookie('koa:sess')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login')
        return false
      } else {
        if (this.$route.path === '/login') {
          this.getLoginUser()
          this.$router.push('/homepage')
        }
        return true
      }
    },
    /**
     * 获取指定名称的cookie值
     * @param name
     * @returns {RegExpMatchArray | any | Array | {index: number, input: string} | string | *}
     */
    getCookie(name) {
      let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
      return arr && arr[2]
    },
    getLoginUser() {
      getUser().then(res => {
        if (res.success) {
          this.$root.$data.setUser(res.data)
        }
      })
    },
    getRouteDeep(path) {
      if (path === '/homepage' || path === '/order-list' || path === '/user-info') return 1
      if (/^\/list-order-detail\/\d+$/.test(path)) return 2
      if (/^\/user-info\/user-order\/order-detail\/\d+$/.test(path)) return 2
      if (path === '/user-info/user-order') return 2
    }
  },
  created() {
    this.checkLogin() && this.getLoginUser()
  },
  watch: {
    '$route' (to, from) {
      this.checkLogin()
//      let toPath = to.path
//      let fromPath = from.path
//      // 登录页不做跳转样式
//      if (toPath === '/login' || fromPath === '/login') return
      console.log(to)
      console.log(from)
      if (!to.meta.index || !from.meta.index) {
        this.transitionName = 'slide-none'
      } else if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-none'
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  .router-view {
    position: absolute;
    min-height: 100%;
    width: 100%;
    transition: all .5s ;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
  .slide-none-leave-active {
    opacity: 0;
    display: none;
  }
  .slide-none-enter {
    display: inline;
  }
}
</style>

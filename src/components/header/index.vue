<template>
  <div class="blog-header">
    <div class="blog-header__content">
      <ul class="blog-header__content-nav">
        <li v-for="(item,index) in navList"
            :key="index"
            @click="goTo(item)">{{item.name}}</li>
      </ul>
      <div class="blog-header__content-time"
           v-if="hour >= 0 && minute >= 0 &&second >= 0">
      <p>{{hour}}:{{minute}}:{{second}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'blogHeader',

  data() {
    return {
      navList: [
        {
          router: 'home',
          name: '首页',
          active: false,
        },
        {
          router: 'blog',
          name: '博客',
          active: false,
        },
        {
          router: 'about',
          name: '关于',
          active: false,
        },
        {
          router: 'demo',
          name: 'Demo',
          active: false,
        },
        {
          router: 'login',
          name: '登录',
          active: false,
        }
      ],
      disabled: false,
      hour: -1,
      minute: -1,
      second: -1,
    };
  },

  created() {
    this.countdown()
  },

  methods: {
    countdown() {
      setInterval(() => {
        this.hour = moment(new Date()).format('HH')
        this.minute = moment(new Date()).format('mm')
        this.second = moment(new Date()).format('ss')
      }, 1000)
    },
    goTo(item) {
      console.log(this.$route.name);
      console.log(item.router);
      if (this.$route.name === item.router || this.disabled) return
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1650)
      this.$router.push({ name: item.router })
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-header {
  height: 38px;
  width: 100%;
  margin: 0 auto;
  font-family: MyNewFont;
  padding: 0 32px;
  &__content {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-nav {
      height: 100%;
      display: flex;
      align-items: center;
      li {
        font-size: 16px;
        cursor: pointer;
        padding: 0 12px;
        line-height: 38px;
      }
    }
    &-time {
      font-size: 16px;
      color: #666;
    }
  }
}
</style>
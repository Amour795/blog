<template>
  <div id="app">
    <header>
      <BlogHeader />
    </header>
    <main id="main">
      <div class="transition"
           v-if="abb">
        <div v-for="item in 10"
             :key="item"
             :style="{'animation-duration':list[random(1,10)]}"></div>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script>
import BlogHeader from '@components/header/index'
export default {
  components: { BlogHeader },
  data() {
    return {
      abb: false,
      list: [
        '1s', '1.2s', '1.4s', '1.2s', '1.5s', '1.3s', '1.6s', '1.5s', '1.2s', '1.1s'
      ]
    }
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    switchAnimation() {
      this.abb = true
      setTimeout(() => {
        this.abb = false
      }, 1600)
    }
  },
  created(){
    this.switchAnimation()
  },
  watch: {
    //使用watch 监听$router的变化
    $route() {
      this.switchAnimation()
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
#main {
  width: 100%;
  height: calc(100% - 38px);
  margin: 0 auto;
  position: relative;
}
.transition {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1501;
  div {
    background: #F0ECBC;
    position: relative;
    height: 10%;
    width: 100%;
    left: -100%;
    animation: mymove 1.2s;
    animation-fill-mode: both;
  }
  @keyframes mymove {
    0% {
      opacity: 1;
      left: -100%;
    }
    50% {
      opacity: 1;
      left: 0%;
    }
    100% {
      opacity: 1;
      left: 100%;
    }
  }
}
</style>


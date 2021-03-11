<template>
  <div id="blog">
    <header>
      <BlogHeader @click='goTo' />
    </header>
    <main id="main">
      <div class="transition"
           v-if="isTransition">
        <div v-for="item in 10"
             :key="item"
             :style="{'animation-duration':list[item]}"></div>
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
      isTransition: false,
      list: [
        '1.6s', '1.5s', '1.6', '1.5s', '1.6s', '1.6s', '1.5s', '1.5s', '1.6s', '1.5s'
      ]
    }
  },
  methods: {
    zz() {
      for (let i = this.list.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * this.list.length);
        let newa = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = newa;
      }
    },
    goTo(router) {
      this.switchAnimation()
      setTimeout(() => {
        this.$router.push({ name: router })
      }, 780)
    },
    switchAnimation() {
      this.zz()
      this.isTransition = true
      setTimeout(() => {
        this.isTransition = false
      }, 1600)
    }
  },
  created() {
    this.switchAnimation()
  }
};
</script>
<style lang="scss" scoped>
#blog {
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
  left: 0;
  right: 0;
  div {
    background: #f0ecbc;
    position: relative;
    height: 10%;
    width: 100%;
    left: -100%;
    animation: mymove 1.6s;
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
    75% {
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


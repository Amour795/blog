
<template>
  <div class="blog-home">
    <!-- <button @click="go('login')">login</button>
    <button @click="go('calendar')">calendar</button> -->
    <div class="blog-home-welcome-msg">
      <span>Hey There</span><br>
      <span>I'm Amour 795</span><br>
      <span>￣▽￣ #Skr
        <span class="blog-home-welcome-msg__cursor"></span>
      </span>
    </div>
    <ul class="blog-home-footer">
      <li>
        <span>const</span>
        <span>Date = {{nowDate}}</span>
      </li>
      <li>
        <span>const</span>
        <span>Add = WUHAN</span>
      </li>
      <li>
        <span>const</span>
        <span>WWW.AMOUR795.TOP</span>
      </li>
      <li>
        <span>鄂ICP备20013875号</span>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'home',
  data() {
    return {
      nowDate:  moment(new Date()).format('YYYY/M/D')
    };
  },

  methods: {
    go(name) {
      this.$router.push({ name: name })
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-home {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #A7BFCB;
  &-welcome-msg {
    font-size: 88px;
    color: #fff;
    font-family: NewFont;
    padding-left: 32px;
    line-height: 1.4;
    position: relative;
    overflow: hidden;
    > span {
      position: relative;
      left: -100%;
      animation: mymove 0.6s;
      animation-delay: 1.4s;
      animation-fill-mode: both;
    }
    > span::before {
      position: absolute;
      content: '';
      background: #F0ECBC;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      animation: mymove1 0.6s;
      animation-delay: 2s;
      animation-fill-mode: both;
    }
    &__cursor {
      width: 2px;
      height: 88px;
      background: hsla(0, 0%, 100%, 0);
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -8px;
      animation: mymove2 1s infinite;
      animation-delay: 2.8s;
    }

    @keyframes mymove {
      0% {
        left: -100%;
      }
      100% {
        left: 0;
      }
    }
    @keyframes mymove1 {
      0% {
        left: 0;
        width: 100%;
      }
      100% {
        width: 0%;
        left: 100%;
      }
    }
    @keyframes mymove2 {
      0% {
        background: #fff;
      }
      50% {
        background: hsla(0, 0%, 100%, 0);
      }
      100% {
        background: #fff;
      }
    }
  }
  &-footer {
    width: 100%;
    padding: 0 42px;
    display: flex;
    align-items: center;
    height: 100px;
    flex-wrap: wrap;
    position: fixed;
    bottom: 12px;
    li {
      flex-grow: 1;
      height: 100%;
      display: flex;
      align-items: baseline;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
      justify-content: center;
      line-height: 100px;
      span:nth-child(1) {
        font-size: 24px;
        color: #F0ECBC;
        font-weight: bold;
        margin-right: 12px;
      }
      span:nth-child(2) {
        font-size: 20px;
        color: #333333;
        font-weight: bold;
      }
    }
    li:last-child {
      border-right: none;
      span {
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}
</style>
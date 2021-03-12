<template>
  <div class="admin-login">
    <!-- <span @click="$router.back()">back</span> -->
    <div class="admin-login__box">
      <p class="admin-login__box-title">Login</p>
      <input v-model="userInfo.userName"
             type="text"
             placeholder="用户名"><br>
      <input v-model="userInfo.password"
             type="password"
             placeholder="密码"><br>
      <div class="admin-login__box-btn">
        <!-- <button @click="$router.push({name:'home'})">离开</button> -->
        <!-- <button @click="submit">注册</button> -->
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister } from '@api/user'
export default {
  name: 'Home',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      index: 0,
      userInfo: {
        userName: '',
        password: ''
      }
    };
  },

  computed: {},

  watch: {},

  created() {
  },

  methods: {
    async submit() {
      let res = await userRegister(this.userInfo)
      if (res.state) {
        this.$Message.success(res.message)
      } else {
        this.$Message.error(res.message)
      }
    },
    async login() {
      localStorage.removeItem('TOKEN')
      let res = await userLogin(this.userInfo)
      if (res.status) {
        this.$router.push({ name: 'main' })
        localStorage.setItem('TOKEN', res.token)
      } else {
        this.$Message.error(res.message)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.admin-login {
  background: #a7bfcb;
  width: 100%;
  height: 100%;
  &__box {
    width: 300px;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    background: rgb(255 255 255 / 30%);
    border-radius: 8px;
    &-title {
      font-size: 24px;
      font-family: NewFont;
      padding: 20px;
    }
    input {
      width: 240px;
      height: 36px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #999999;
      margin-bottom: 14px;
      padding: 0 12px;
      font-size: 14px;
      color: #333;
    }
    &-btn {
      padding: 24px 0;
      button {
        font-size: 14px;
        font-family: NewFont;
        padding: 8px 22px;
        margin: 0 12px;
        border-radius: 4px;
        background: #fff;
        border: 1px solid #999999;
      }
    }
  }
}
</style>
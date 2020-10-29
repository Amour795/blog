<template>
  <div>
    <input v-model="userInfo.userName"
           type="text"
           placeholder="用户名"><br>
    <input v-model="userInfo.password"
           type="text"
           placeholder="密码"><br>
    <button @click="submit">注册</button>
    <button @click="login">登录</button>
    <button @click="show">show</button>
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
    show() {
      this.index += 1
      this.$toast.info(`第${this.index}个弹窗`)
    },
    async submit() {
      let res = await userRegister(this.userInfo)
      console.log(res);
    },
    async login() {
      let res = await userLogin(this.userInfo)
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
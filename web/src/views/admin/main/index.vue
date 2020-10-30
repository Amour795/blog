
<template>
  <div class="main-wrapper">
    <header @click="$router.push({name:'home'})">
      Blog Adimin
    </header>
    <main>
      <div class="main-wrapper__nav">
        <Menu theme="light"
              :active-name="$route.name">
          <MenuItem v-for="(item,index) in list"
                    :key="index"
                    :name="item.router" 
                    :to='item.router'>
          <Icon :type="item.icon" />{{item.title}}
          </MenuItem>
        </Menu>
      </div>
      <div class="main-wrapper__content">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>



<script>

export default {
  name: 'wrapper',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [
        {
          title: '首页管理',
          router: 'homeManage',
          icon: 'md-document'
        },
        {
          title: '文章管理',
          router: 'articleTable',
          icon: 'md-document'
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() { 
    console.log();
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 32px;
    font-size: 20px;
    font-family: NewFont;
    border-bottom: 1px solid #d9d9d9;
  }
  main {
    height: 100%;
    display: flex;
  }
  ::v-deep .ivu-menu {
    height: 100%;
  }
  &__nav {
    flex: none;
  }
  &__content {
    width: 100%;
    height: 100%;
    > div {
      width: 900px;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
<template>
  <div class="article-list">
    <header>
      Blog
    </header>
    <main>
      <div class="article"
           v-for="(item,index) in 10"
           :key="index">
        <h3 class="article__title">@基于Css Variable的主题切换完美解决方案</h3>
        <p class="article__time">2020-03-06 03:39</p>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'articleList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {

    };
  },

  computed: {},

  watch: {},

  created() { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.article-list {
  width: 360px;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #666666;
  overflow: hidden;
  margin-right: 24px;
  flex: none;
  header {
    height: 40px;
    background: #d2d2d2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: MyNewFont;
    font-weight: bold;
    font-size: 18px;
  }
  main {
    background:#ffffff;
    height: calc(100% - 40px);
    overflow-y: scroll;
    .article {
      // height: 42px;
      padding: 12px;
      &__title {
        font-family: MyNewFont;
        font-size: 18px;
        margin-bottom: 12px;
        color: #333333;
      }
      &__time {
        font-family: MyNewFont;
        font-size: 12px;
        font-weight: normal;
        color: #666666;
      }
    }
  }
}
</style>
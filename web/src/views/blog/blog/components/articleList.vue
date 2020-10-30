<template>
  <div class="article-list">
    <header>
      Blog
    </header>
    <main>
      <div class="article"
           v-for="(item,index) in articleList"
           :key="index"
           @click="select(item)" 
           :style="{'background':article.id === item.id ? '#F0ECBC':''}"
           >
        <h3 class="article__title">@{{item.title}}</h3>
        <p class="article__time">{{item.createTime | dateFormat}}</p>
      </div>
    </main>
  </div>
</template>

<script>
import { getArticleList } from '@api/blog.js'

export default {
  name: 'articleList',

  data() {
    return {
      articleList: [],
      article:{}
    };
  },

  created() {
    getArticleList().then(res => {
      this.articleList = res
      this.select(res[0])
    })
  },

  methods: {
    select(item){
      this.article = item
      this.$emit('select',item)
    }
  },
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
    background: rgb(0 0 0 / 20%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NewFont;
    font-weight: bold;
    font-size: 18px;
    color:#333;
  }
  main {
    background: #ffffff;
    height: calc(100% - 40px);
    overflow-y: scroll;
    padding:8px;
    .article {
      padding: 12px;
      cursor: pointer;
          border-radius: 14px;
      &__title {
        font-family: NewFont;
        font-size: 18px;
        margin-bottom: 8px;
        color: #333333;
      }
      &__time {
        font-family: NewFont;
        font-size: 12px;
        font-weight: normal;
        color: #666666;
      }
    }
  }
}
</style>
<template>
  <div class="article-list">
    <header>
      {{details.title}}
    </header>
    <main>
      <div>
        <div>
          <h4>{{details.title}}</h4>
          <div>
            <span>复制链接</span>
            <span>{{details.createTime | dateFormat}}</span>
          </div>
        </div>
        <editorPreview :article="details.content" />
      </div>
    </main>
  </div>
</template>

<script>
import editorPreview from '@components/mavonEditor/preview'
import { getArticleById } from '@api/blog.js'
export default {
  name: 'articleList',

  model: {
    prop: "info"
  },

  props: {
    info: {
      type: Object
    }
  },
  components: { editorPreview },

  data() {
    return {
      details:{
        content:''
      }
    };
  },
  methods: {
    getInfo(indo) {
      getArticleById({ id: indo.id }).then(res => {
       this.details = res
      })
    }
  },
  watch: {
    info: {
      handler(v) {
        this.getInfo(v)
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  min-width: 800px;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #666666;
  overflow: hidden;
  header {
    height: 40px;
    background: rgb(0 0 0 / 20%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: MyNewFont;
    font-size: 18px;
    color:#333;
  }
  main {
    height: calc(100% - 40px);
    overflow-y: scroll;
    background: #ffffff;
    > div {
      width: 680px;
      margin: 0 auto;
    }
  }
}
</style>
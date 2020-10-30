<template>
  <div class="article-list">
    <header>
      复制链接时间
    </header>
    <main>
       <div>
         <div>
         <h4>标题</h4>
       <div>
         <span>复制链接</span>
         <span>时间</span>
       </div>
       </div>
      <editorPreview :article="article" />
       </div>
    </main>
  </div>
</template>

<script>
import editorPreview from '@components/mavonEditor/preview'
export default {
  name: 'articleList',

  components: { editorPreview },

  data() {
    return {
      article: '# 欢迎使用 Markdown在线编辑器 MdEditor **Markdown是一种轻量级的「标记语言」**'
    };
  },
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
  }
  main {
    height: calc(100% - 40px);
    overflow-y: scroll;
    background:#ffffff;
    >div{
      width: 680px;
    margin: 0 auto;
    }
  }
}
</style>
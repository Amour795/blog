<template>
  <div class="article-list">
    <header>
      {{details.title}}
    </header>
    <main>
      <div>
        <editorPreview :article="details.content" />
      </div>
      <div class="msg-Info"
           style="margin-top: 24px;">
        <Input v-model="msgInfo.content"
               type="textarea"
               :maxlength='120'
               show-word-limit
               :autosize="{minRows: 3,maxRows: 5}"
               placeholder="请输入留言内容" />
        <div style="margin-top: 12px;text-align: right;">
          <Button @click="save"
                  type="info">保存</Button>
        </div>
        <ul class="msg-list">
          <li v-for="(item,index) in msgList"
              :key="index">
            <p class="msg-list__content">{{item.content}}</p>
            <p class="msg-list__user">
              <span class="msg-list__createTime">{{item.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
              <span class="msg-list__userName">{{item.userName}}</span>
            </p>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import editorPreview from '@components/mavonEditor/preview'
import { getArticleById } from '@api/blog'
import { saveMessage, getMessageList } from '@api/message'
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
      msgInfo: {
        articleId: '',
        content: ''
      },
      msgList: [],
      details: {
        content: ''
      }
    };
  },
  methods: {
    getInfo(indo) {
      getArticleById({ id: indo.id }).then(res => {
        this.details = res
        this.msgInfo.articleId = res.id
        this.getMessageList()
      })
    },
    async save() {
      await saveMessage({ ...this.msgInfo })
      this.$Message.success('保存成功')
      this.getMessageList()
      this.msgInfo.content = ''
    },
    getMessageList() {
      getMessageList(this.msgInfo.articleId).then(res => {
        this.msgList = res
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
    font-family: NewFont;
    font-size: 18px;
    color: #333;
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
  .msg-list {
    margin-top: 32px;
    li {
      padding: 20px 0;
    }

    &__content {
      font-family: NewFont;
      font-size: 16px;
      line-height: 1.6em;
    }
    &__user {
      text-align: right;
      padding-top: 12px;
    }
    &__userName {
      font-family: NewFont;
      font-size: 14px;
      font-weight: bold;
    }
    &__createTime {
      font-family: NewFont;
      font-size: 12px;
      margin-right: 12px;
    }
  }
}
</style>
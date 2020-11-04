<template>
  <div>
    <Button style="margin: 24px 0;" @click="$router.push({name: 'editArticle'})">创建文章</Button>
    <Table :columns="columns1"
           :data="articleList">
      <template slot-scope="{ row }"
                slot="handle">
        <Button type="text"
                @click="handleDelete(row)">删除</Button>
        <Button type="text"
                @click="handleEdit(row)">编辑</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getArticleList, deleteArticleById } from '@api/admin.js'

export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      columns1: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'handle',
        }
      ],
      articleList: []
    };
  },

  computed: {},

  watch: {},

  created() {
    this.getList()
  },

  methods: {
    getList() {
      getArticleList().then(res => {
        this.articleList = res
      })
    },
    async handleDelete(item) {
      let res = await deleteArticleById({ id: item.id })
      res && this.$Message.success('删除成功')
      this.getList()
    },
    handleEdit(item) {
      this.$router.push({
        name: 'editArticle',
        query: {
          id: item.id
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
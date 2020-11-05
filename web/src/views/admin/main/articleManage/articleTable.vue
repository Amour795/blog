<template>
  <div>
    <Button style="margin: 24px 0;"
            @click="$router.push({name: 'editArticle'})">创建文章</Button>
    <Table :columns="columns1"
           :data="articleList">
      <template slot-scope="{ row }"
                slot="title">
        {{row.title}}<Tag style="margin-left: 8px;"
             v-if="row.publish"
             color="orange">草稿</Tag>
      </template>
      <template slot-scope="{ row }"
                slot="createTime">
        {{row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
      </template>
      <template slot-scope="{ row }"
                slot="handle">
        <Poptip confirm
                transfer
                title="确认删除此文章吗?"
                @on-ok="handleDelete(row)">
          <Button type="error">删除</Button>
        </Poptip>
        <Button type="info" style="margin-left: 24px;" @click="handleEdit(row)">编辑</Button>
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
          slot: 'title',
        },
        {
          title: '创建时间',
          slot: 'createTime',
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
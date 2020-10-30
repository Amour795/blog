<template>
  <div>
    <Button @click="$router.push({name: 'editArticle'})">创建文章</Button>
    <Table :columns="columns1"
           :data="articleList">
      <template slot-scope="{ row }"
                slot="handle">
        <Button type="text"
                @click="handleDetails(row)">详情</Button>
        <Button type="text"
                @click="handleDelete(row)">删除</Button>
        <Button type="text"
                @click="handleEdit(row)">编辑</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getArticleList } from '@api/admin.js'

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
    getArticleList().then(res => {
      this.articleList = res
    })
  },

  methods: {
    handleDetails(item) {
      this.$router.push({
        name: 'editArticle',
        query: {
          id: item.id
        }
      })
    },
    handleDelete(item) {
      this.$router.push({
        name: 'editArticle',
        query: {
          id: item.id
        }
      })
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
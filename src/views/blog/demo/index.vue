<template>
  <div>
    <button @click="save">save</button>
  </div>
</template>

<script>
import { saveBlog, getArticleList, getArticleById } from '@api/blog.js'
export default {
  name: 'demo',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {

    };
  },

  computed: {},

  watch: {},

  created() {
    getArticleList().then(res => {
      console.log(res);
    })
    getArticleById({ id: '5f9b7e68076dd9109c186326' }).then(res => {
      console.log(res);
    })
  },

  methods: {
    save() {
      let data = {
        title: '测试标题1',
        content: '123123123123',
        tag: [1, 1, 1, 1],
        imgList: [2, 2, 2, 2],
        mainImg: '11',
        thumbnail: '11'
      }
      saveBlog(data).then(res => {
        console.log(res);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
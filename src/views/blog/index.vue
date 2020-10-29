<template>
  <div class="blog">
    <articleList />
    <articleMain />
  </div>
</template>

<script>
import articleList from './components/articleList'
import articleMain from './components/articleMain'
export default {
  name: 'blog',

  mixins: [],

  components: { articleList, articleMain },

  data() {
    return {

    };
  },
  
  created() { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.blog {
  height: 100%;
  padding: 32px;
  display: flex;
  background-color: #A7BFCB;
}
</style>
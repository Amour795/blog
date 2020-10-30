<template>
  <div class="blog">
    <articleList @select="(v) => {data = v}" />
    <articleMain v-model="data" />
  </div>
</template>

<script>
import articleList from './components/articleList'
import articleMain from './components/articleMain'
export default {
  name: 'blog',

  components: { articleList, articleMain },

  data() {
    return {
      data: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.blog {
  height: 100%;
  padding: 32px;
  display: flex;
  background-color: #a7bfcb;
}
</style>
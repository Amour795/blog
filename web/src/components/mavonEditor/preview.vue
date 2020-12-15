<template>
  <div>
    <div id="vditorPreviewDom"></div>
  </div>
</template>

<script>
import VditorPreview from 'vditor/dist/method.min'
import "vditor/src/assets/scss/index.scss";

export default {
  props: {
    article: {
      type: String
    }
  },

  data() {
    return {
      vditorPreviewEl: '',
      contentEditor: ''
    }
  },

  watch: {
    article(v) {
      let _vditorPreviewDom = document.getElementById('vditorPreviewDom')
      _vditorPreviewDom && VditorPreview.preview(_vditorPreviewDom, v)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <div @click="openPreviewImg"
         id="vditorPreviewDom"></div>
    <div class="preview-img"
         v-if='previewImgShow'
         @click.stop="closePreviewImg">
      <img :src="imgUrl"
           @click.stop
           :class="imgUrl && close ? 'img-scale-open' : 'img-scale-close'"
           alt="">
    </div>
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
      imgUrl: '',
      close: false,
      previewImgShow: false
    }
  },

  watch: {
    article(v) {
      let _vditorPreviewDom = document.getElementById('vditorPreviewDom')
      console.log(_vditorPreviewDom);
      _vditorPreviewDom && VditorPreview.preview(_vditorPreviewDom, v)
    }
  },

  methods: {
    openPreviewImg({ target }) {
      target.src && (this.previewImgShow = true)
      this.close = true
      setTimeout(() => {
        target.src && (this.imgUrl = target.src)
      }, 10)
    },
    closePreviewImg() {
      this.close = false
      setTimeout(() => {
        this.previewImgShow = false
        this.imgUrl = ''
      }, 240)
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep img{
  cursor: pointer;
}
.preview-img {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80%;
    transition: all 0.3s;
    transform: scale(0);
    position: relative;
  }
  .img-scale-open {
    transform: scale(1);
  }
  .img-scale-close {
    transform: scale(0);
  }
}
</style>
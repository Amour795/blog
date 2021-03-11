<template>
  <div>
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";
import { uploadFiles } from '@api/upload'
export default {
  name: '',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    height: {
      type: Number,
      default: 320
    },
    value: {
      type: String
    }
  },

  watch: {
    value() {
      this.contentEditor.setValue(this.value)
    }
  },

  data() {
    return {
      contentEditor: ""
    };
  },

  mounted() {
    let _this = this
    this.contentEditor = new Vditor("vditor", {
      height: _this.height,
      toolbarConfig: {
        // pin: true,
        // hide:true,
      },
      cache: {
        enable: false
      },
      input: (value) => {
        this.$emit('change',value)
      },
      upload: {
        handler: (files) => {
          var formdata = new FormData();
          formdata.append('file', files[0]);
          uploadFiles(formdata).then(res => {
            let imgUrl = `${process.env.VUE_APP_BASE_URL}${res.url}`
            _this.contentEditor.insertValue(`![${files[0].name}](${encodeURI(imgUrl)})`)
          })
        }
      }
    })
  }
};
</script>

<style lang="scss" scoped>
</style>
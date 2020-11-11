<template>
  <div class="editor-preview">
    <mavonEditor v-model="article"
                 :subfield="false"
                 :boxShadow="false"
                 defaultOpen="preview"
                 :toolbarsFlag="false"  
                 codeStyle='monokai'/>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'editorPreview',

  components: { mavonEditor },

  props: {
    article: {
      type: String
    }
  },

};
</script>

<style lang="scss" scoped>
.editor-preview {
  margin: auto;
  height: 100%;
}
</style>
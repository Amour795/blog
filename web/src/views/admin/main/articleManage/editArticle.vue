<template>
  <div>
    <p class="title">新增文章</p>
    <Form ref="formData"
          :model="formData"
          :label-width="80">
      <FormItem label="标题">
        <Input v-model="formData.title"
               placeholder="标题" />
      </FormItem>
      <FormItem label="标题">
        <div style="height: 320px;z-index: 999;position: relative;">
          <editorEdit v-model="formData.content"  :height='320'/>
        </div>
      </FormItem>
      <FormItem label="标题">
        <Select v-model="formData.tag"
                filterable
                multiple
                allow-create
                @on-create="handleCreate">
          <Option v-for="item in list"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <Button @click="handleSubmit(false)">发布</Button>
      <Button @click="handleSubmit(true )">存草稿</Button>
    </Form>
  </div>
</template>
<script>
import { saveBlog, getArticleById } from '@api/admin.js'
import editorEdit from '@components/mavonEditor/edit'
export default {
  name: 'articleManage',
  components: { editorEdit },
  data() {
    return {
      list: [],
      formData: {
        title: '',
        content: '',
        tag: [],
        mainImg: '',
        thumbnail: '',
        publish: false
      }
    }
  },
  methods: {
    handleSubmit(publish) {
      this.formData.publish = publish
      saveBlog(this.formData).then(res => {
        res && this.$Message.success('文章发布成功');
      })
    },
    handleCreate(val) {
      this.list.push({
        value: val,
        label: val
      });
    },
    getInfo() {
      getArticleById({ id: this.$route.query.id }).then(res => {
        if (!res) return
        this.formData = res
        this.list = res.tag.map(v => {
          return {
            value: v,
            label: v,
          }
        })
      })
    }
  },
  created() {
    this.$route.query.id && this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-family: NewFont;
  padding: 24px 0;
}
</style>


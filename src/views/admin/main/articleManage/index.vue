<template>
  <div>
    <Form ref="formData"
          :model="formData"
          :label-width="80">
      <FormItem label="标题">
        <Input v-model="formData.title"
               placeholder="标题" />
      </FormItem>
      <FormItem label="标题">
        <editorEdit v-model="formData.content" />
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
      <Button @click="handleSubmit">发布</Button>
      <Button>存草稿</Button>
    </Form>
  </div>
</template>
<script>
import { saveBlog } from '@api/blog.js'
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
        imgList: [2, 2, 2, 2],
        mainImg: '11',
        thumbnail: '11'
      }
    }
  },
  methods: {
    handleSubmit() {
      saveBlog(this.formData).then(res => {
       res&& this.$Message.success('文章发布成功');
      })
    },
    handleCreate(val) {
      this.list.push({
        value: val,
        label: val
      });
    }
  }
}
</script>


<template>
  <div>
    <InputNumber :max="1000"
                 style="width:220px;margin-bottom: 12px;"
                 :min="1"
                 v-model="endPage"></InputNumber>
    <br>
    <Button type="info"
            style="width:220px"
            @click="updateMovie">更新电影</Button>
  </div>
</template>

<script>
import { updateMovie } from '@/api/movie'
export default {
  name: 'homeManage',

  data() {
    return {
      endPage: 10
    };
  },

  methods: {
    updateMovie() {
      updateMovie({ endPage: this.endPage }).then(() => {
        this.$Message.success('操作成功，可能需要等待较长的时间，请稍后重试')
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
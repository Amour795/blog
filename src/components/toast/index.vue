<template>
  <div class="toast">
    <div v-for="(item,index) in list"
         :key="index">
      <div class="toast-box"
           :class="{'margin-b':list.length >= 2,
                      'toast-box__close': !item.satus,
                      'toast-box__open':item.satus,
                    }">
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'toast',

  data() {
    return {
      list: [],
      itemIndex: -1
    };
  },

  methods: {
    info(text) {
      this.build('info', text)
    },
    success(text) {
      this.build('success', text)
    },
    warning(text) {
      this.build('warning', text)
    },
    error(text) {
      this.build('error', text)
    },
    build(type, text) {
      let data = {
        'type': type,
        'text': text,
        'countdown': 3000,
        'satus': true,
        'index': this.itemIndex += 1
      }
      this.list.push(data)
      setTimeout(() => {
        this.$set(data, 'satus', false)
        setTimeout(() => {
          this.list.splice(this.list.findIndex(item => item.index === data.itemIndex), 1)
        }, 340)
      }, data.countdown)
    }
  }
};
</script>

<style lang="scss" >
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  &-box {
    border: 1px solid #abdcff;
    background-color: #f0faff;
    padding: 8px 16px;
    border-radius: 4px;
    color: #515a6e;
    font-size: 14px;
    line-height: 16px;
    &__open {
      animation: mymove 0.4s;
      animation-fill-mode: both;
    }
    &__close {
      animation: mymove1 1.2s;
      animation-fill-mode: both;
    }
  }
  @keyframes mymove1 {
    0% {
      opacity: 1;
      left: 0px;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      left: 0px;
      transform: translate3d(0, -180px, 0);
    }
  }
  @keyframes mymove {
    0% {
      opacity: 0;
      left: 0px;
      transform: translate3d(0, -1000px, 0);
    }
    100% {
      opacity: 1;
      left: 0px;
      transform: translate3d(0, 0, 0);
    }
  }
  .margin-b {
    margin-bottom: 6px;
  }
}
</style>
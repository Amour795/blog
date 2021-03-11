<template>
  <div class="template-box">
    <header>
      {{title}}
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>

export default {
  name: 'about',

  props:{
    title:{
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.template-box {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #666666;
  overflow: hidden;
  flex: none;
  header {
    height: 40px;
    background: rgb(0 0 0 / 20%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NewFont;
    font-weight: bold;
    font-size: 18px;
    color: #333;
  }
  main {
    background: #ffffff;
    height: calc(100% - 40px);
    overflow-y: scroll;
    position: relative;
  }
}
</style>
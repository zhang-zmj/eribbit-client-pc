<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }} <small> {{ subTitle }} </small>
          <slot name="right"></slot>
        </h3>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePannel',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>

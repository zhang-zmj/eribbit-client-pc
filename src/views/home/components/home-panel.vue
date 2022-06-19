<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          <div class="head-left">
            {{ title }} <small> {{ subTitle }} </small>
          </div>
          <div class="head-right"><slot name="right"></slot></div>
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
  background: #ffffff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      display: flex;
      justify-content: space-between;
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

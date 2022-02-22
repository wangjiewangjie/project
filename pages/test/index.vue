<template>
  <view class="page">
    <u-navbar title="顺序练习">
      <view class="navbar-right" slot="right">
        <view class="right-item">
          <u-image width="40rpx" height="40rpx" :src="`${ossUrl}exam-answer_1.png`"></u-image>
          <view class="right-item-r">看答案</view>
        </view>
      </view>
    </u-navbar>

    <view class="question-title">
      <text class="question-type">单选</text>良好的职业道德、精益求精的按摩技能是( )的必要素质。
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  export default {
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .right-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    width: 90px;
    height: 36px;
    background: #f5f5f5;
    border-radius: 26px;
    font-size: 16px;
    color: #999999;
    .right-item-r {
      margin-left: 2px;
    }
  }
  .question-title {
    margin: 24px 12px 0;
    font-size: 24px;
    line-height: 34px;
    color: #333333;
    .question-type {
      padding: 2px 6px;
      height: 24px;
      background: linear-gradient(113deg, #4787f0 1.71%, #266fe8 70.21%);
      border-radius: 2px 12px 12px 2px;
      font-size: 16px;
      color: #ffffff;
    }
  }
</style>

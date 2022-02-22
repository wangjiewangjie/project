<template>
  <view class="progressbar">
    <block v-for="(item, index) in progressbarList" :key="index">
      <view class="progressbar-item">
        <view class="progressbar-success" v-if="current > index + 1">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}progressbar_success.png`"></u-image>
        </view>
        <view class="progressbar-num" v-if="current === index + 1">{{ index + 1 }}</view>
        <view class="progressbar-num progressbar-num-fill" v-if="current < index + 1">
          {{ index + 1 }}
        </view>
        <view class="progressbar-title">{{ item.title }}</view>
      </view>
      <view
        class="progressbar-line"
        :class="current >= index + 1 ? '' : 'progressbar-line-fill'"
        v-if="index !== 3"
      ></view>
    </block>
  </view>
</template>

<script>
  import config from '@/config/config';
  export default {
    props: {
      current: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        progressbarList: [
          {
            title: '填写信息',
          },
          {
            title: '上传资料',
          },
          {
            title: '缴费',
          },
          {
            title: '报名成功',
          },
        ],
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  $fillColor: #dcdcdc;

  .progressbar {
    display: flex;
    justify-content: space-between;
    padding: 32rpx 24rpx;
    background: #fff;

    .progressbar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 96rpx;
      .progressbar-success {
        margin-bottom: 24rpx;
      }
      .progressbar-num {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 24rpx;
        width: 48rpx;
        height: 48rpx;
        border-radius: 100%;
        background: $u-type-primary;
        font-weight: 500;
        font-size: 24rpx;
        line-height: 32rpx;
        color: #ffffff;
      }
      .progressbar-num-fill {
        background: $fillColor;
      }

      .progressbar-title {
        font-size: 24rpx;
        line-height: 32rpx;
        color: $u-main-color;
      }
    }

    .progressbar-line {
      margin-top: 24rpx;
      width: 92rpx;
      height: 4rpx;
      background: $u-type-primary;
    }

    .progressbar-line-fill {
      background: $fillColor;
    }
  }
</style>

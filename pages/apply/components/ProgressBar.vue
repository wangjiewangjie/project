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
    padding: 16px 12px;
    background: #fff;

    .progressbar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 48px;
      .progressbar-success {
        margin-bottom: 12px;
      }
      .progressbar-num {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background: $u-type-primary;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
      }

      .progressbar-num-fill {
        background: $fillColor;
      }

      .progressbar-title {
        font-size: 12px;
        line-height: 16px;
        color: #333333;
      }
    }

    .progressbar-line {
      margin-top: 12px;
      width: 46px;
      height: 2px;
      background: $u-type-primary;
    }

    .progressbar-line-fill {
      background: $fillColor;
    }
  }
</style>

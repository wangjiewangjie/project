<template>
  <view class="page">
    <u-tabs
      :list="examList"
      :current="examCurrent"
      @change="examChange"
      inactive-color="#999"
      active-color="#333"
      font-size="40"
      height="100"
      bar-width="32"
      bar-height="8"
      gutter="24"
    ></u-tabs>
    <view class="level">
      <view
        class="level-li"
        :class="levelCurrent === index ? 'level-selected' : ''"
        v-for="(item, index) in levelList"
        :key="index"
        @click="chooseLevel(index)"
        >{{ item.level }}</view
      >
    </view>

    <view class="exam-num-wrap">
      <view class="exam-num-item-l">
        <view class="exam-num-name">未做题</view>
        <view class="exam-num">99</view>
      </view>
      <view class="exam-num-item-r">
        <view class="exam-num-name">错题</view>
        <view class="exam-num">1</view>
      </view>
    </view>

    <view class="exam-card">
      <view class="card-content">
        <view class="card-content-l">
          <view class="card-content-l-t">顺序练习</view>
          <view class="card-content-l-b">答题进度</view>
        </view>
        <u-image width="48rpx" height="48rpx" :src="`${ossUrl}right-arrows_4.png`"></u-image>
      </view>
      <view class="progress-wrap">
        <u-line-progress :percent="80" height="12" active-color="#fff"></u-line-progress>
        <view class="progress">20/200</view>
      </view>
    </view>

    <view class="exam-card card-success">
      <view class="card-content">
        <view class="card-content-l">
          <view class="card-content-l-t">模拟考试</view>
          <view class="card-content-l-b">模拟平均分</view>
        </view>
        <u-image width="48rpx" height="48rpx" :src="`${ossUrl}right-arrows_4.png`"></u-image>
      </view>
      <view class="progress-wrap">
        <u-line-progress :percent="70" height="12" active-color="#fff"></u-line-progress>
        <view class="progress">20分</view>
      </view>
    </view>

    <u-tabbar
      v-model="current"
      :list="tabbarList"
      :icon-size="54"
      active-color="#0052d9"
      inactive-color="#666"
    ></u-tabbar>
  </view>
</template>

<script>
  import config from '@/config/config';
  export default {
    data() {
      return {
        examList: [
          {
            name: '月嫂',
          },
          {
            name: '育婴师',
          },
          {
            name: '催乳师',
          },
          {
            name: '产后康复师',
          },
          {
            name: '小儿推拿师',
          },
        ],
        examCurrent: 0,

        levelList: [{ level: '五级' }, { level: '四级' }, { level: '三级' }],
        levelCurrent: 0,

        ossUrl: config.ossUrl,
        tabbarList: config.tabbarList,
        current: 2,
      };
    },
    methods: {
      examChange(index) {
        this.examCurrent = index;
      },
      chooseLevel(index) {
        this.levelCurrent = index;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .level {
    display: flex;
    margin: 24rpx;
    .level-li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 218rpx;
      height: 96rpx;
      background: #fff;
      border-radius: 16rpx;
      font-size: 36rpx;
      color: $u-main-color;
      & + .level-li {
        margin-left: 24rpx;
      }
    }
    .level-selected {
      background: $u-type-primary;
      color: #fff;
    }
  }

  .exam-num-wrap {
    display: flex;
    justify-content: space-between;
    margin: 0 24rpx;
    .exam-num-item-l,
    .exam-num-item-r {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 340rpx;
      height: 200rpx;
      border-radius: 16rpx;
      font-weight: 600;
      font-size: 36rpx;
      line-height: 48rpx;
      color: #333333;
      .exam-num {
        margin-top: 32rpx;
        font-weight: bold;
        font-size: 80rpx;
        line-height: 80rpx;
      }
    }
    .exam-num-item-l {
      background: rgba(0, 82, 217, 0.05);
      .exam-num {
        color: $u-type-primary;
      }
    }
    .exam-num-item-r {
      background: rgba(227, 77, 89, 0.05);
      .exam-num {
        color: $u-type-error;
      }
    }
  }

  .exam-card {
    margin: 24rpx 24rpx 0;
    padding: 32rpx 24rpx;
    background: linear-gradient(113deg, #4787f0 1.71%, #266fe8 70.21%);
    border-radius: 16rpx;
    color: #fff;
    .card-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8rpx;
    }
    .card-content-l-t {
      margin-bottom: 32rpx;
      font-weight: 500;
      font-size: 52rpx;
      line-height: 60rpx;
    }
    .card-content-l-b {
      font-size: 36rpx;
      line-height: 48rpx;
    }
    .progress-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .u-progress {
        width: 482rpx;
        background: rgba(#fff, 0.2) !important;
        .u-active {
          background: rgba(#fff, 0.6) !important;
        }
      }
      .progress {
        flex-shrink: 0;
        font-size: 40rpx;
        line-height: 56rpx;
      }
    }
  }
  .card-success {
    background: linear-gradient(113deg, #48c79c 1.71%, #00a870 70.21%);
  }
</style>

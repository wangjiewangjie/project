<template>
  <view class="page">
    <ProgressBar :current="3"></ProgressBar>

    <view class="exam-info-wrap card">
      <view class="exam-info-header">
        <view class="exam-num">报名编号：EB8332819982192</view>
        <view class="exam-time">02-08 15:33</view>
      </view>
      <view class="exam-content-wrap">
        <u-image width="216rpx" height="144rpx" src="/static/images/wx-code.png"></u-image>
        <view class="exam-content">
          <view class="exam-name">育婴师 初级/五级</view>
          <view class="exam-price">¥260.00</view>
        </view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试期数</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试时间</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试场地</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
    </view>
    <view class="exam-ul card">
      <view class="exam-li">
        <view class="exam-li-l">优惠</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">总计</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
    </view>
    <view class="exam-ul card">
      <view class="exam-ul-title">报名须知</view>
      <view class="exam-ol">1.请确认考试信息和考试时间无误,购买成功后将不予退换</view>
      <view class="exam-ol">
        2.下单即代表你同意
        <text class="a">《xxxx协议》</text>
      </view>
    </view>

    <Contact></Contact>

    <!-- 支付 -->
    <view class="footer">
      <view class="price-wrap">
        实付金额：
        <view class="price"> <text class="price-rmb">¥</text>260.00 </view>
      </view>
      <u-button class="pay" type="error" shape="circle" @click="submit">去支付</u-button>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  import ProgressBar from './components/ProgressBar.vue';
  import Contact from './components/Contact.vue';
  export default {
    components: {
      ProgressBar,
      Contact,
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
  }

  .card {
    margin: 12px 12px 0;
    border-radius: 8px;
    background: #fff;
  }

  .exam-info-wrap {
    .exam-info-header {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      font-size: 12px;
      line-height: 16px;
      color: #666666;
      border-bottom: 1px solid #f5f5f5;
    }
    .exam-content-wrap {
      display: flex;
      padding: 12px 12px 20px;
      .exam-content {
        flex: 1;
        margin-left: 8px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #333333;
        .exam-price {
          font-size: 14px;
          line-height: 22px;
          color: #e34d59;
        }
      }
    }

    .exam-li {
      padding: 0 12px 12px;
      color: #666666;
    }
  }

  .exam-li {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 18px;
  }

  .exam-ul {
    padding: 12px;
    .exam-li {
      color: #333333;
      & + .exam-li {
        padding-top: 12px;
      }
      .exam-li-r {
        font-weight: bold;
      }
      &:nth-child(1) {
        .exam-li-r {
          color: #e34d59;
        }
      }
    }
    .exam-ul-title {
      font-size: 14px;
      line-height: 18px;
      color: #333333;
    }
    .exam-ol {
      padding-top: 12px;
      font-size: 12px;
      line-height: 16px;
      color: #666666;
      .a {
        color: $u-type-primary;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px 0;
    width: 100%;
    border-top: 0.5px solid #e0e0e0;
    background: #f7f7f7;
    .price-wrap {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 16px;
      color: #333333;
      .price {
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        color: #e34d59;
      }
      .price-rmb {
        font-size: 14px;
      }
    }
    .pay {
      margin: 0;
      width: 142px;
      height: 40px;
    }
  }
</style>

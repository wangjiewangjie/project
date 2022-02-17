<template>
  <view class="page">
    <view class="swiper-wrap">
      <u-swiper height="226" :indicatorStyle="indicatorStyle" :list="list"></u-swiper>
    </view>

    <view class="menu-wrap">
      <view class="menu-item" v-for="(item, index) in menuList" :key="index">
        <u-image width="96rpx" height="96rpx" :src="`${ossUrl}${item.icon}`"></u-image>
        <view class="menu-name">{{ item.name }}</view>
      </view>
    </view>

    <view class="notice-wrap">
      <view class="notice-wrap-top">
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}index-notice.png`"></u-image>
        <u-notice-bar
          bg-color="#fff"
          type="primary"
          mode="vertical"
          :volume-icon="false"
          :list="noticeList"
        ></u-notice-bar>
      </view>
      <view class="notice-wrap-bottom">
        <text>第2022期&nbsp;&nbsp;1月14日报名截止</text>
        <u-button class="notice-btn" type="primary" shape="circle">立即报名</u-button>
      </view>
    </view>

    <view class="exam-wrap">
      <view class="exam-wrap-title">
        <view class="exam-title">相关认定项目</view>
        <view class="more-btn">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <u-tabs
        :list="examList"
        :current="examCurrent"
        @change="examChange"
        inactive-color="#999"
        active-color="#0052D9"
        font-size="28"
        height="48"
        bar-width="20"
        bar-height="4"
        gutter="24"
      ></u-tabs>
      <view class="exam-card">
        <view class="exam-card-header">
          <view class="exam-course">育婴师</view>
          <view class="exam-price">8000~22000元</view>
        </view>
        <view class="exam-num">10000人关注</view>
        <view class="exam-des"
          >育婴师是用现代教育观念和科学方法对0-3岁婴儿进行生活照料、护理和教育的专业人员。主要从事婴儿的照料、护理和教育工作。现在每个家庭对孩子都是极度关注，因此育婴师正在成为一个炙手可热的热门行业。</view
        >
        <u-button class="exam-btn" type="primary" shape="circle">立即报考</u-button>
      </view>
    </view>

    <view class="school-wrap">
      <view class="school-wrap-title">
        <view class="school-title">推荐培训学校</view>
        <view class="more-btn">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <SchoolCard></SchoolCard>
    </view>

    <view class="follow-wrap">
      <u-image width="224rpx" height="224rpx" src="/static/images/wx-code.png"></u-image>
      <view class="follow-wrap-r">
        <view class="follow-tips">长按识别二维码</view>
        <view class="follow-tips">关注官方公众号</view>
        <view class="follow-wx">阜城市家庭服务业协会认定中心</view>
      </view>
    </view>
    <view class="page-footer">- 绝影天行科技公司技术支持 -</view>

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
  import SchoolCard from '@/components/SchoolCard/SchoolCard';
  export default {
    component: {
      SchoolCard,
    },
    data() {
      return {
        ossUrl: config.ossUrl,

        indicatorStyle: {
          indicatorStyle: 'dot',
        },
        list: [
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        ],

        menuList: [
          {
            icon: 'index-menu_1.png',
            name: '考试流程',
            path: '',
          },
          {
            icon: 'index-menu_2.png',
            name: '重要通知',
            path: '',
          },
          {
            icon: 'index-menu_3.png',
            name: '相关政策',
            path: '',
          },
          {
            icon: 'index-menu_4.png',
            name: '关于我们',
            path: '',
          },
        ],

        noticeList: [
          '赵**已报名  保育员师级/二级',
          '钱**已报名  保育员师级/二级',
          '孙**已报名  保育员师级/二级',
          '李*已报名  保育员师级/二级',
        ],

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

        tabbarList: config.tabbarList,
        current: 1,
      };
    },
    methods: {
      examChange(index) {
        this.examCurrent = index;
      },
    },
  };
</script>

<style lang="scss" scoped>
  $margin: 24rpx 24rpx 0rpx;
  $background: #fff;
  $borderRadius: 16rpx;

  .swiper-wrap {
    margin: $margin;
  }

  .menu-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: $margin;
    padding: 24rpx 0;
    background: $background;
    border-radius: $borderRadius;
    font-weight: 500;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-content-color;
    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .menu-name {
        margin-top: 16rpx;
      }
    }
  }

  .notice-wrap {
    margin: $margin;
    background: $background;
    border-radius: $borderRadius;
    overflow: hidden;
    .notice-wrap-top {
      display: flex;
      align-items: center;
      padding: 16rpx 24rpx;
      border-bottom: 1rpx solid $u-border-color;
      .u-notice-bar-wrap {
        flex: 1;
      }
    }
    .notice-wrap-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 24rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-main-color;
      .notice-btn {
        margin: 0;
        width: 160rpx;
        height: 64rpx;
      }
    }
  }

  .exam-wrap,
  .school-wrap {
    margin: $margin;
    background: $background;
    border-radius: $borderRadius;
    overflow: hidden;

    .u-tabs {
      margin: 24rpx 0 16rpx;
    }
  }

  .exam-wrap-title,
  .school-wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx;
    font-weight: 600;
    font-size: 36rpx;
    line-height: 48rpx;
    color: $u-main-color;
  }

  .more-btn {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-tips-color;
  }

  .exam-card {
    margin: 0 24rpx 24rpx;
    padding: 28rpx 24rpx 24rpx;
    background: linear-gradient(180deg, #ecf2fe 0%, rgba(236, 242, 254, 0) 100%);
    border-radius: 16rpx;
    .exam-card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4rpx;
      .exam-course {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 40rpx;
        color: $u-main-color;
      }
      .exam-price {
        font-weight: 500;
        font-size: 36rpx;
        line-height: 48rpx;
        text-align: right;
        color: $u-type-primary;
      }
    }
    .exam-num {
      margin-bottom: 24rpx;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;
    }
    .exam-des {
      margin-bottom: 48rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-content-color;
    }
  }

  .follow-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 160rpx;
    padding: 24rpx;
    .follow-wrap-r {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .follow-tips {
      font-weight: 500;
      font-size: 32rpx;
      line-height: 40rpx;
      color: $u-main-color;
    }
    .follow-wx {
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
  }

  .page-footer {
    padding: 24rpx 0;
    font-size: 24rpx;
    line-height: 28rpx;
    color: $u-tips-color;
    text-align: center;
  }
</style>

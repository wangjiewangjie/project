<template>
  <view class="paper-type2">
    <u-circle-progress
      active-color="#5CC7A4"
      inactive-color="#E6F6F1"
      width="308"
      border-width="16"
      :percent="percent"
    >
      <view class="u-progress-content">
        <text class="u-progress-score">
          {{ examResult.studentScore || '0' }}
          <text class="u-progress-score-r">分</text>
        </text>
        <text class="u-progress-info">用时{{ examTime | filterExamTime }}</text>
      </view>
    </u-circle-progress>
    <view class="exam-endtime">{{ examResult.examName }}考试 {{ endTime }}</view>
    <view class="ul">
      <view class="li" @click="onShowResults">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_1.png`"></u-image>
        </view>
        <view class="li-b">炫成绩</view>
      </view>
      <view class="li" @click="routerTest('1')">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_2.png`"></u-image>
        </view>
        <view class="li-b">查试卷</view>
      </view>
      <view class="li" @click="routerTest('0')">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_3.png`"></u-image>
        </view>
        <view class="li-b">看错题</view>
      </view>
      <view class="li" @click="routerExam">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_4.png`"></u-image>
        </view>
        <view class="li-b">重新考</view>
      </view>
    </view>

    <u-popup v-model="showPopup" mode="bottom">
      <view>
        <view class="share-wrap" ref="share">
          <view class="share">
            <u-circle-progress
              active-color="#00a870"
              inactive-color="#E6F6F1"
              width="308"
              border-width="16"
              :percent="percent"
            >
              <view class="u-progress-content">
                <text class="u-progress-score">
                  {{ examResult.studentScore || '0' }}
                  <text class="u-progress-score-r">分</text>
                </text>
                <text class="u-progress-info">用时{{ examTime | filterExamTime }}</text>
              </view>
            </u-circle-progress>

            <view class="tips">我会继续努力，快给我鼓励吧！</view>
            <view class="user-wrap">
              <u-image width="74rpx" height="74rpx" :src="`${ossUrl}exam-header.png`"></u-image>
              <view class="exam-userinfo">
                <view class="phone">{{ userInfo.phone | filterPhone }}</view>
                <view class="exam-endtime">{{ examResult.examName }}考试{{ endTime }}</view>
              </view>
            </view>
          </view>
          <view class="qrcode-wrap">
            <view class="qrcode-wrap-l">
              <view class="qrcode-name">{{ examResult.examName }}认定中心</view>
              <view class="qrcode-tips">
                长按识别二维码
                <br />领取专属学习秘籍
              </view>
            </view>
            <div ref="QRCode"></div>
          </view>
        </view>

        <!-- 分享 -->
        <view class="popup-footer">
          <view class="li" @click="onWXShare">
            <view class="share-btn">
              <u-image width="64rpx" height="64rpx" :src="`${ossUrl}wx-share_1.png`"></u-image>
            </view>
            <view class="share-title">分享给微信好友</view>
          </view>

          <view class="li" @click="onWXShare(1)">
            <view class="share-btn">
              <u-image width="64rpx" height="64rpx" :src="`${ossUrl}wx-share_2.png`"></u-image>
            </view>
            <view class="share-title">分享到朋友圈</view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import dayjs from 'dayjs';
  import config from '@/config/config';
  import html2canvas from 'html2canvas';
  import QRCode from 'qrcodejs2';
  import commonInfo from '@/util/commonInfo';
  import wx from '@/util/wx';
  export default {
    props: {
      examResult: {
        type: Object,
        default: () => {},
      },
    },
    filters: {
      filterExamTime(val) {
        return `${Math.floor(val / 1000 / 60)}′${Math.floor(val / 1000) % 60}`;
      },
      filterPhone(val) {
        return ` ${val.substr(0, 3)}****${val.substr(7)}`;
      },
    },
    data() {
      return {
        examTime: '',
        endTime: '',
        ossUrl: config.ossUrl,
        showPopup: false,
        imgRes: '',
        userInfo: {},
      };
    },
    created() {
      this.percent = parseInt((this.examResult.studentScore / this.examResult.totalScore) * 100);

      this.examTime = this.examResult.endTime - this.examResult.startTime;
      this.endTime = dayjs(Number(this.examResult.endTime)).format('YYYY/MM/DD HH:mm:ss');

      this.userInfo = commonInfo.getUser();
      wx.queryWechatConfig();
    },
    methods: {
      routerTest(value) {
        let params = {
          id: this.examResult.id,
          rightWrongType: value,
        };
        this.$u.route({
          url: '/pages/test/index',
          params: params,
        });
      },
      routerExam() {
        let params = {
          id: this.examResult.mockTestPaperId,
        };
        this.$u.route({
          url: '/pages/test/mocktest/index',
          params: params,
          type: 'redirectTo',
        });
      },
      onShowResults() {
        this.showPopup = true;
        this.$nextTick(() => {
          let qrcode = new QRCode(this.$refs.QRCode, {
            text: config.shareH5BaseUrl,
            width: 52,
            height: 52,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
          });

          html2canvas(this.$refs.share, {
            // 这里的ref指向要截取的dom
            useCORS: true, // 这里针对跨域获取的图片，有效解决截取后图片为空白问题
            scale: window.devicePixelRatio, // 解决图片不清晰问题
          }).then((canvas) => {
            this.imgRes = canvas.toDataURL('image/jpg');
          });
        });
      },
      onWXShare(e) {
        wx.customWxShare({
          shareType: e,
          title: '',
          desc: '',
          imgUrl: this.imgRes,
          link: '',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .paper-type2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .u-circle-progress {
    margin: 48rpx 0;
  }

  .u-progress-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333333;

    .u-progress-score {
      font-size: 120rpx;
    }

    .u-progress-score-r {
      font-size: 28rpx;
    }

    .u-progress-info {
      font-size: 28rpx;
      line-height: 36rpx;
    }
  }

  .exam-endtime {
    font-size: 32rpx;
    line-height: 40rpx;
    color: #666666;
  }

  .ul {
    display: flex;
    justify-content: space-between;
    margin-top: 72rpx;
    padding: 0 40rpx;
    width: 100%;

    .li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24rpx;
    }

    .li-b {
      margin-top: 12rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: #666666;
    }
  }

  .share-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 24rpx;
    width: 552rpx;
    height: 940rpx;
    background: #ecf2fe;

    .share {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48rpx 12rpx;
      width: 100%;
      background: #fff;
      border-radius: 24rpx;
    }

    .tips {
      margin: 52rpx 0 44rpx;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 36rpx;
      color: #666666;
    }

    .user-wrap {
      display: flex;
      align-items: center;
      padding: 16rpx;
      height: 110rpx;
      background: #ecf2fe;
      border-radius: 12rpx;

      .u-image {
        flex-shrink: 0;
        margin-right: 16rpx;
      }

      .phone {
        margin-bottom: 6rpx;
        font-weight: 500;
        font-size: 24rpx;
        line-height: 32rpx;
        color: #0052d9;
      }

      .exam-endtime {
        font-size: 14rpx;
        line-height: 20rpx;
        color: #666666;
      }
    }

    .qrcode-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 48rpx;
      width: 100%;

      .qrcode-wrap-l {
        .qrcode-name {
          margin-bottom: 8rpx;
          font-weight: 600;
          font-size: 28rpx;
          line-height: 32rpx;
          color: #000000;
        }

        .qrcode-tips {
          width: 200rpx;
          font-size: 24rpx;
          line-height: 32rpx;
          color: #666666;
        }
      }

      .qrcode {
        width: 104rpx;
        height: 104rpx;
      }
    }
  }

  .popup-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 216rpx;
    padding: 32rpx 190rpx;
    height: 256rpx;
    border-radius: 32rpx 32rpx 0 0;
    background: #ffffff;

    .li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .share-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 112rpx;
        height: 112rpx;
        border: 2rpx solid #dcdcdc;
        box-sizing: border-box;
        border-radius: 16rpx;
      }

      .share-title {
        margin-top: 16rpx;
        width: 96rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        text-align: center;
        color: #666666;
      }
    }
  }

  /deep/.u-drawer-bottom {
    background: transparent !important;
  }
</style>

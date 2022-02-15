<template>
  <view class="content">
    <!-- 分享tools -->
    <u-popup
      v-model="showShare"
      @close="showShare = false"
      safe-area-inset-bottom
      mode="bottom"
      border-radius="20"
      :closeable="false"
    >
      <view class="share-box">
        <view class="share-list-box u-flex">
          <!-- #ifdef MP-WEIXIN -->
          <button class="share-item share-btn u-flex-col u-col-center" open-type="share">
            <image
              class="share-img"
              src="https://oss.bm001.com/banma-standard-c/image/order/share_wx.png"
              mode=""
            ></image>
            <text class="share-title">微信好友</text>
          </button>
          <!-- #endif -->
          <view class="share-item u-flex-col u-col-center" @tap="copySharePath">
            <image
              class="share-img"
              src="https://oss.bm001.com/banma-standard-c/image/order/share_link.png"
              mode=""
            ></image>
            <text class="share-title">复制链接</text>
          </view>
        </view>
        <view class="share-foot u-flex u-row-center u-col-center" @tap="showShare = false"
          >取消</view
        >
      </view>
    </u-popup>

    <!-- 分享指引 -->
    <u-popup
      v-model="showShareGuide"
      safe-area-inset-bottom
      mode="top"
      :closeable="false"
      :bgStyle="{ background: 'none' }"
    >
      <view class="guide-wrap u-flex u-col-top u-row-center"
        ><image
          class="guide-img"
          src="https://oss.bm001.com/banma-standard-c/image/order/share_guide.png"
          mode=""
        ></image
      ></view>
    </u-popup>
  </view>
</template>
<script>
  /**
   * 分享弹窗
   * @property {Boolean} value = showModal - v-model控制显隐
   * @property {Object} shareDetail - 分享信息
   */
  export default {
    name: 'shoproShare',
    components: {},
    data() {
      return {
        showShareGuide: false, //H5的指引。
        platform: this.$platform.get(),
      };
    },
    props: {
      shareDetail: {
        type: Object,
        default: () => {},
      },
      value: {},
    },
    computed: {
      showShare: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        },
      },
    },

    created() {
      uni.$on('ON_WX_SHARE', () => {
        this.showShare = false;
      });
    },
    methods: {
      // 关闭弹窗
      onClosePoster() {
        this.showPoster = false;
        uni.showTabBar();
      },
      // 复制链接
      copySharePath() {
        let that = this;
        uni.setClipboardData({
          data: that.shareDetail.copyLink,
          success: () => {
            that.$u.toast('已复制到剪切板');
            that.showShare = false;
          },
        });
      },
    },
  };
</script>

<style lang="scss">
  // 指引
  .guide-wrap {
    height: 100%;
    .guide-img {
      width: 580rpx;
      height: 430rpx;
    }
  }
  // 分享tool
  .share-box {
    background: #fff;
    width: 750rpx;
    border-radius: 30rpx 30rpx 0 0;
    padding-top: 30rpx;
    position: relative;

    .share-foot {
      font-size: 24rpx;
      color: #bfbfbf;
      height: 80rpx;
      border-top: 1rpx solid #eee;
    }

    .share-list-box {
      .share-btn {
        background: none;
        border: none;
        line-height: 1;
        padding: 0;
        &::after {
          border: none;
        }
      }
      .share-item {
        flex: 1;
        padding-bottom: 20rpx;

        .share-img {
          width: 70rpx;
          height: 70rpx;
          background: rgba(246, 246, 254, 1);
          border-radius: 50%;
          margin-bottom: 20rpx;
        }

        .share-title {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
</style>

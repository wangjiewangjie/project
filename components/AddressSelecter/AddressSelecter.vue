<template>
  <view @click="handleAddressClick" class="address-selecter-warp">
    <view class="address-container">
      <u-icon color="#666" class="address-icon" name="map"></u-icon>
      <text class="u-line-1"> {{ address }}</text>
    </view>
  </view>
</template>

<script>
  import _ from 'lodash';
  import { queryGeoPlacceAround } from '@/util/ajax/services.js';

  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        address: 'loading...',
      };
    },
    mounted() {
      this.createListener();
      this.initDefaultAddress();
    },
    methods: {
      createListener() {
        uni.$on('SELECT_ADDRESS', (res) => {
          if (res?.address) {
            this.address = res.address;
            this.$emit('change-address', res);
          }
        });
      },
      handleAddressClick() {
        this.$Router.push({ path: '/pages/address/list' });
      },
      initDefaultAddress() {
        uni.getLocation({
          type: 'gcj02',
          altitude: true,
          success: (res) => {
            this.getAddressListByLngLat(res);
          },
          fail: (err) => {
            this.address = '定位失败';
            uni.showToast({
              icon: 'none',
              title: err,
              duration: 2000,
            });
          },
        });
      },
      /**
       * 根据经纬度与半径获取附近兴趣点
       */
      async getAddressListByLngLat(v) {
        const res = await queryGeoPlacceAround({
          latitude: v.latitude,
          longitude: v.longitude,
          distance: 1000,
        });
        const data = _.get(res, 'dataList[0]', []);
        this.address = data.address;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .address-selecter-warp {
    @include flex();
    width: 750rpx;
    background: $uni-bg-color;
    font-size: #333;
    padding: 32rpx 32rpx 0rpx 32rpx;
    overflow: hidden;

    .address-container {
      @include flex();

      .address-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
</style>

<script>
  import commonInfo from 'util/commonInfo';

  export default {
    onLaunch: function () {
      // 判断是不是iPhone X 以及以上
      uni.getSystemInfo({
        success: function (res) {
          if (
            res.model &&
            (res.model.indexOf('iPhone X') > -1 || res.model.indexOf('iPhone 11') > -1)
          ) {
            commonInfo.setPhoneX(true);
          } else {
            commonInfo.setPhoneX(false);
          }
        },
      });
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          let location = {
            latitude: res.latitude,
            longitude: res.longitude,
          };
          commonInfo.setLocaiton(location);
        },
      });
    },
    onShow: function () {},
    onHide: function () {},
  };
</script>
<style lang="scss">
  @import 'uview-ui/index.scss';
  @import './common/sass/main.scss';
</style>

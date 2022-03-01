<template>
  <view class="page">
    <view class="page-top">
      <view class="title">欢迎登录{{ name }}认定中心</view>
      <view class="login-form">
        <u-form :model="form" ref="uForm">
          <u-form-item prop="phone">
            <u-image
              class="icon"
              width="48rpx"
              height="48rpx"
              :src="`${ossUrl}login-phone.png`"
            ></u-image>
            <u-input placeholder="请输入手机号" v-model="form.phone" type="number"></u-input>
          </u-form-item>
          <u-form-item prop="code">
            <u-image
              class="icon"
              width="48rpx"
              height="48rpx"
              :src="`${ossUrl}login-password.png`"
            ></u-image>
            <u-input placeholder="请输入验证码" v-model="form.code" type="number"></u-input>
            <u-button
              class="send-btn"
              plain
              slot="right"
              :type="sendType"
              size="mini"
              @click="getCode()"
              >{{ codeTips }}</u-button
            >
          </u-form-item>
        </u-form>
        <view class="tips">新用户登录即完成注册</view>
        <u-button
          class="login-btn"
          :disabled="loginDisabled"
          type="primary"
          shape="circle"
          @click="submit"
          >登录</u-button
        >
      </view>
      <u-verification-code
        startText="发送验证码"
        changeText="Xs后重发"
        seconds="60"
        ref="uCode"
        @change="codeChange"
      ></u-verification-code>
    </view>

    <view class="page-bottom">
      <!-- 第三方登录 -->
      <view class="other-login">
        <view class="other-login-header">
          <text class="line"></text>
          <text>第三方账号登录</text>
          <text class="line"></text>
        </view>
        <view class="wx-login" @click="wxLogin">
          <u-icon name="weixin-fill" color="#07C160" size="52"></u-icon>
        </view>
      </view>

      <!-- 协议 -->
      <view class="agreement">
        <u-checkbox v-model="checked" shape="circle" @change="change">
          登录代表您已同意
          <text class="a">《家协通服务协议》</text>
          <text class="a">、《隐私协议》</text>
        </u-checkbox>
      </view>
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
  /* eslint-disable no-eq-null */
  import jsencrypt from '@/components/jsencrypt/jsencrypt.vue';
  import config from '@/config/config';
  import commonInfo from '@/util/commonInfo';
  import { getLoginCode, phoneLogin, loginByOpenId } from '@/util/ajax/services';
  export default {
    data() {
      return {
        ossUrl: config.ossUrl,

        name: '南京',

        form: {
          phone: '',
          code: '',
        },
        options: {},

        codeTips: '',
        sendType: 'primary',

        loginDisabled: true,
        checked: false,

        rules: {
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: ['change', 'blur'],
            },
            {
              validator: (rule, value) => {
                return this.$u.test.mobile(value);
              },
              message: '手机号码不正确',
              trigger: ['change', 'blur'],
            },
          ],
          code: [
            {
              required: true,
              message: '请输入验证码',
              trigger: ['change', 'blur'],
            },
            {
              validator: (rule, value) => {
                return this.$u.test.code(value, 6);
              },
              message: '验证码不正确',
              trigger: ['change', 'blur'],
            },
          ],
        },
      };
    },
    watch: {
      dateRange: {
        handler(e) {
          if (this.$u.test.code(e.code, 6) && this.$u.test.mobile(e.phone)) {
            this.loginDisabled = false;
          }
        },
        deep: true,
      },
    },
    computed: {
      dateRange() {
        const { phone, code } = this.form;
        return { phone, code };
      },
    },
    onLoad(options) {
      this.options = options;
    },
    onShow() {
      const code = this.getUrlParam('code');
      if (code !== null) {
        uni.showLoading({
          title: '微信登录中',
        });
        let params = {
          code: code,
          appId: config.h5wxAppId,
          userType: 13,
        };
        this.loginByOpenIdApi(params);
      }
    },
    methods: {
      change(e) {
        this.checked = e.value;
      },
      codeChange(text) {
        this.codeTips = text;
      },
      /**
       * 获取验证码
       */
      async getCode() {
        if (!this.$refs.uCode.canGetCode) {
          return;
        }
        if (!this.$u.test.mobile(this.form.phone)) {
          this.$u.toast('请输入正确的手机号');
          return;
        }
        const timestamp = Math.round(new Date().getTime());
        const str = `phone&${this.form.phone}@sender&JFE0001@behaviour&${5}@timestamp&${timestamp}`;
        const params = {
          keyId: '3',
          secret: jsencrypt.setEncrypt(config.publicKey, str),
        };
        const res = await getLoginCode(params);
        if (res.rescode === 200) {
          this.$refs.uCode.start();
        } else {
          this.$u.toast(res.msg);
        }
      },
      async loginByOpenIdApi(params) {
        let res = await loginByOpenId(params);
        uni.hideLoading();
        if (res.rescode === 200) {
          commonInfo.setToken(res.data.token);
          commonInfo.setUser(res.data.user);
          commonInfo.setOpenId(res.data.openid);
          this.routerLogin();
        } else {
          this.$refs.uToast.show({
            title: '微信登录失败',
            type: 'error',
          });
        }
      },
      submit() {
        if (!this.checked) {
          this.$u.toast('请阅读《家协通服务协议》、《隐私协议》');
          return;
        }
        this.$refs.uForm.validate(async (valid) => {
          if (valid) {
            const params = {
              companyId: 'G00001',
              openId: '',
              phone: this.form.phone,
              userType: 13,
              verifychkcode: this.form.code,
              loginType: 2, //验证码登录
            };
            const res = await phoneLogin(params);
            if (res.rescode === 200) {
              commonInfo.setToken(res.data.token);
              commonInfo.setUser(res.data.user);

              this.routerLogin();
            } else {
              this.$refs.uToast.show({
                title: res.msg,
                type: 'error',
              });
            }
          }
        });
      },

      wxLogin() {
        if (!this.checked) {
          this.$u.toast('请阅读《家协通服务协议》、《隐私协议》');
          return;
        }
        const AppId = config.h5wxAppId; // 公众号的AppId
        const location = window.location.href; // 获取当前的页面路径，这就是回调的地址
        const code = this.getUrlParam('code');
        if (code == null) {
          window.location.href =
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            AppId +
            '&redirect_uri=' +
            encodeURIComponent(location) +
            '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        } else {
          let params = {
            code: code,
            appId: AppId,
            userType: 13,
          };
          this.loginByOpenIdApi(params);
        }
      },
      routerLogin() {
        if (this.options.back) {
          this.$refs.uToast.show({
            title: '登录成功',
            type: 'success',
            back: true,
          });
        } else {
          this.$refs.uToast.show({
            title: '登录成功',
            type: 'success',
            url: '/pages/index/index',
            isTab: true,
          });
        }
      },
      getUrlParam(name) {
        // 获取URL指定参数
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r !== null) return unescape(r[2]);
        return null; // 返回参数值
      },
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
  };
</script>

<style lang="scss" scoped>
  $paddingY: 48rpx;

  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background: #fff;
  }

  .page-top,
  .page-bottom {
    width: 100%;
  }

  .title {
    padding: 128rpx $paddingY 92rpx;
    font-weight: 500;
    font-size: 48rpx;
    line-height: 68rpx;
    color: $u-main-color;
  }

  .login-form {
    padding: 0 $paddingY;
    width: 100%;
    .send-btn {
      width: 204rpx;
      height: 64rpx;
      background: #fff !important;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-light-color;
    }
    .icon {
      margin-right: 16rpx;
    }
  }

  .tips {
    padding: 24rpx 0 128rpx;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-tips-color;
  }

  .other-login-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-tips-color;
    .line {
      display: inline-block;
      width: 266rpx;
      height: 1rpx;
      background: $u-border-color;
    }
  }

  .wx-login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 48rpx auto;
    width: 96rpx;
    height: 96rpx;
    background: #f5f5f5;
    border-radius: 100%;
  }

  /deep/.agreement {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 36rpx;
    .u-checkbox__label {
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-content-color;
    }
    .a {
      color: $u-type-primary;
    }
  }
</style>

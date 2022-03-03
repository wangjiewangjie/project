<template>
  <view class="tabs-2">
    <view class="tabs-2_bg"></view>

    <view class="query-title"></view>
    <view class="query-form-wrap">
      <view class="query-form-title">
        <view class="query-form-name">{{ `search information`.toUpperCase() }}</view>
      </view>
      <view class="query-form">
        <u-form
          :model="form"
          ref="uForm"
          :error-type="errorType"
          :label-style="labelStyle"
          label-width="192"
        >
          <CertFormItem
            v-for="(item, index) in formList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :required="item.required"
            :placeholder="item.placeholder"
            :type="item.type"
            :selectList="item.selectList"
            :value="item.value"
            @inputValueChange="inputValueChange($event, item.prop)"
          ></CertFormItem>
        </u-form>

        <u-button class="query-btn" type="warning" shape="circle" @click="submit"
          >立即查询</u-button
        >
      </view>
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
  /* eslint-disable no-console */
  import config from '@/config/config';
  import CertFormItem from '../../apply/components/CertFormItem.vue';
  export default {
    components: {
      CertFormItem,
    },
    data() {
      return {
        form: {
          name: '',
          idcard: '',
        },
        formList: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            placeholder: '请输入姓名',
            type: '',
            selectList: [],
            value: '',
          },
          {
            label: '身份证号',
            prop: 'idcard',
            required: true,
            placeholder: '请输入身份证号',
            type: '',
            selectList: [],
            value: '',
          },
        ],
        /* 表单校验 */
        rules: {
          name: [
            {
              required: true,
              message: '对不起，姓名填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
            {
              validator: (rule, value) => {
                return this.$u.test.chinese(value);
              },
              message: '对不起，姓名填写格式有误，请检查并重新填写。',
              trigger: ['change', 'blur'],
            },
            {
              max: 10,
              message: '姓名长度最大10个字符',
            },
          ],
          idcard: [
            {
              required: true,
              message: '对不起，身份证填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
            {
              validator: (rule, value) => {
                return this.$u.test.idCard(value);
              },
              message: '对不起，身份证填写格式有误，请检查并重新填写。',
              trigger: ['change', 'blur'],
            },
          ],
        },
        /* 表单样式 */
        errorType: ['toast'],
        labelStyle: {
          fontSize: '32rpx',
          lineHeight: '40rpx',
          color: '#333333',
        },
        ossUrl: config.ossUrl,
      };
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      inputValueChange(e, prop) {
        this.form[prop] = e;
      },

      submit() {
        console.log(this.$refs.uForm);
        this.$refs.uForm.validate(async (valid) => {
          if (valid) {
            let params = { ...this.form };

            this.$u.route({
              url: '/pages/query/resultList/index',
              params: params,
            });
          } else {
            console.log('验证失败');
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  $golden: #dfc483;
  .tabs-2 {
    position: relative;
    width: 100%;
    height: calc(100% - 96px);
    background: #262c57;
    .tabs-2_bg {
      position: absolute;
      width: 750rpx;
      height: 100%;
      background: url($ossUrl + 'query-bg2.png') no-repeat;
      background-size: 100%;
    }

    .query-form-wrap {
      position: absolute;
      top: 162px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .query-form-title {
        display: flex;
        padding: 16rpx 32rpx;
        background: $golden;
        border-radius: 16rpx 16rpx 0 0;
        font-weight: 500;
        font-size: 22rpx;
        line-height: 32rpx;
        letter-spacing: 8rpx;
        color: #262c57;
      }
      .query-form-name {
        padding: 0 18rpx;
      }
      .query-form {
        padding: 48rpx 24rpx;
        width: 686rpx;
        height: 480rpx;
        background: #fefefe;
        box-shadow: 0px 4rpx 24rpx rgba(88, 20, 25, 0.5);
        border-radius: 16rpx;
      }
      /deep/.u-form-item {
        padding: 17rpx 24rpx;
        height: 104rpx;
        background: #f7f7f7;
        border-radius: 16rpx;
        & + .u-form-item {
          margin-top: 16rpx;
        }
      }
      .query-btn {
        margin-top: 64rpx;
        width: 542rpx;
        height: 96rpx;
        border-radius: 48rpx;
        background: linear-gradient(90deg, #dec382 0%, #bf964d 100%);
      }
    }
  }
</style>

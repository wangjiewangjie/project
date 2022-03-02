<template>
  <view class="page">
    <ProgressBar :current="2"></ProgressBar>
    <view class="tips">如暂时没有准备资料，可缴费后通过我的-报名管理处上传和修改</view>

    <u-form
      :model="form"
      ref="uForm"
      :error-type="errorType"
      :label-style="labelStyle"
      label-width="220"
    >
      <u-form-item prop="imgUrlList" class="photo-wrap">
        <view class="h2">证件照片（1寸照片）</view>
        <!-- 设置上传二进制文件名称name="code" -->
        <u-upload
          :custom-btn="true"
          :action="action"
          :max-count="1"
          :max-size="2 * 1024 * 1024"
          :header="header"
          @on-success="(file) => _success(file)"
          name="code"
        >
          <view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
            <u-image width="240rpx" height="336rpx" :src="`${ossUrl}apply_2-upload.png`"></u-image>
          </view>
        </u-upload>
        <view class="h3">照片规范</view>
        <view class="ul">
          <view class="li" v-for="(item, index) in photosampleList" :key="index">
            <u-image
              width="156rpx"
              height="218rpx"
              :src="`${ossUrl}${item.photosamplePic}`"
            ></u-image>
            <view class="li-tips">{{ item.tips }}</view>
          </view>
        </view>
        <view class="contact">
          <view class="contact-tips">您还可以联系在线客服，由认定中心工作人员上传。</view>
          <button class="contact-btn">
            <u-image width="32rpx" height="32rpx" :src="`${ossUrl}contact_1.png`"></u-image>联系客服
          </button>
        </view>
      </u-form-item>
      <view class="basics-info-title">基本信息</view>
      <view class="basics-info-wrap">
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
          @selectConfirm="selectConfirm($event, item.prop, formList)"
        ></CertFormItem>
        <view class="more-wrap" v-show="!more" @click="more = true">
          <view class="more-btn">
            展开继续完善信息
            <u-image width="32rpx" height="32rpx" :src="`${ossUrl}down-arrows.png`"></u-image>
          </view>
        </view>
        <view v-show="more">
          <CertFormItem
            v-for="(item, index) in hideformList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :required="item.required"
            :placeholder="item.placeholder"
            :type="item.type"
            :selectList="item.selectList"
            :value="item.value"
            @inputValueChange="inputValueChange($event, item.prop)"
            @selectConfirm="selectConfirm($event, item.prop, hideformList)"
          ></CertFormItem>
        </view>
      </view>
    </u-form>

    <view class="footer">
      <u-button type="primary" shape="circle" @click="submit">知悉上传，下一步</u-button>
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import config from '@/config/config';
  import CertFormItem from './components/CertFormItem.vue';
  import ProgressBar from './components/ProgressBar.vue';
  import form from './js/form';
  import city from './js/city.data';
  import { updateStudentInfo, queryCertificatereservation } from '@/util/ajax/services';
  import commonInfo from '@/util/commonInfo';
  export default {
    components: {
      CertFormItem,
      ProgressBar,
    },
    data() {
      return {
        options: {},
        cartDetail: {},
        form: {
          imgUrlList: [],
          name: '',
          education: '',
          studentSource: '',
          certificateReceive: '',
          professional: '',
          companyName: '',
          province: '',
          city: '',
          workStartTime: '',
          workMajor: '',
          workingLife: '',
          nation: '',
          politicalLandscape: '',
          address: '',
          mailAddress: '',
          permanentaddress: '',
        },
        photosampleList: [
          { photosamplePic: 'apply_2-upload_1.png', tips: '纯色背景白色最佳' },
          { photosamplePic: 'apply_2-upload_2.png', tips: '光线均匀' },
          { photosamplePic: 'apply_2-upload_3.png', tips: '正对镜头双耳露出' },
          { photosamplePic: 'apply_2-upload_4.png', tips: '发型整洁不浓妆' },
        ],
        formList: form.formList,
        hideformList: form.hideformList,
        province: [],

        more: false,

        /* 表单校验 */
        rules: {
          imgUrlList: [
            {
              required: true,
              validator: () => {
                return this.form.imgUrlList.length > 0;
              },
              message: '对不起，证件照不能空，请检查并重新上传。',
              trigger: ['change', 'blur'],
            },
          ],
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
          education: [
            {
              required: true,
              message: '对不起，文化程度填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          studentSource: [
            {
              required: true,
              message: '对不起，考生来源填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          professional: [
            {
              required: true,
              message: '对不起，职业名称填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          companyName: [
            {
              required: true,
              message: '对不起，所在单位填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          province: [
            {
              required: true,
              message: '对不起，省份填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          city: [
            {
              required: true,
              message: '对不起，城市填写不能空，请填写相关内容。',
              trigger: 'blur,change',
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

        action: config.apiHost + '/core/upload/uploadPic',
        header: {
          Authorization: commonInfo.getToken(),
        },
      };
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    onLoad(options) {
      this.options = options;
      /* 省份下拉框添加值 */
      let index = this.formList.findIndex((item) => {
        return item.prop == 'province';
      });
      city.forEach((el) => {
        this.province.push({ value: el.value, label: el.label });
      });
      this.$set(this.formList[index], 'selectList', this.province);

      /* 工种回显 */
      this.setValue(this.hideformList, 'certName', options.certName);
      if (options.edit) {
        let params = {
          id: options.id,
        };
        this.queryCertificatereservationApi(params);
      }
    },
    methods: {
      setValue(array, key, value) {
        let index = array.findIndex((item) => {
          return item.prop == key;
        });
        this.$set(array[index], 'value', value);
      },
      /* 图片上传成功 */
      _success(res) {
        this.form.imgUrlList.push(res.data);
      },
      inputValueChange(e, prop) {
        this.form[prop] = e;
      },
      selectConfirm(e, prop, array) {
        this.form[prop] = e[0].label;
        this.selectChangeValueFn(prop, e, array);

        if (prop === 'province') {
          this.selectCleanFn('city');
          let provinceIndex = this.province.findIndex((item) => {
            return item.value == e[0].value;
          });
          let cityIndex = this.formList.findIndex((item) => {
            return item.prop == 'city';
          });
          this.$set(this.formList[cityIndex], 'selectList', city[provinceIndex].children);
        }
      },
      /* 改变下拉选中的值 */
      selectChangeValueFn(prop, e, array) {
        let index = array.findIndex((item) => {
          return item.prop == prop;
        });
        array[index].value = e[0].label;
      },

      /* 选中联动清空下拉框 */
      selectCleanFn(prop) {
        let index = this.formList.findIndex((item) => {
          return item.prop == prop;
        });
        this.formList[index].selectList = [];
        this.formList[index].value = '';
        this.form[prop] = '';
      },

      submit() {
        this.$refs.uForm.validate(async (valid) => {
          if (valid) {
            let params = { ...this.form };
            let educationObj = form.educationList.find((item) => {
              return item.label == this.form.education;
            });

            let studentSourceObj = form.studentSourceList.find((item) => {
              return item.label == this.form.studentSource;
            });

            let originalLevelObj = form.originalLevel.find((item) => {
              return item.label == this.form.originalLevel;
            });
            params.id = params.education = educationObj ? educationObj.value : '';
            params.studentSource = studentSourceObj ? studentSourceObj.value : '';
            params.originalLevel = originalLevelObj ? originalLevelObj.value : '';
            params.id = this.options.id;
            let res = await updateStudentInfo(params);
            if (res.rescode === 200) {
              this.$refs.uToast.show({
                title: '提交成功',
                type: 'success',
                url: '/pages/apply/apply_3',
                params: res.data,
              });
            } else {
              this.$refs.uToast.show({
                title: res.msg,
                type: 'error',
              });
            }
          }
        });
      },

      async queryCertificatereservationApi(params) {
        let res = await queryCertificatereservation(params);
        this.cartDetail = res.data;
        let editObj = { ...this.cartDetail, ...this.cartDetail.examineScheduleVO };
        /* 数据回显循环 */
        this.formList.forEach((el) => {
          this.setValue(this.formList, el.prop, editObj[el.prop]);
        });
        /* 隐藏部分数据回显 */
        this.hideformList.forEach((el) => {
          this.setValue(this.hideformList, el.prop, editObj[el.prop]);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    overflow: scroll;
  }

  .tips {
    display: flex;
    align-items: center;
    margin: 24rpx 24rpx 0;
    padding: 8rpx 16rpx 12rpx;
    background: rgba(237, 123, 47, 0.1);
    border-radius: 8rpx;
    font-size: 28rpx;
    line-height: 36rpx;
    color: #ed7b2f;
    .u-image {
      margin-right: 8rpx;
    }
  }

  .photo-wrap {
    margin: 24rpx;
    padding: 0;
    background: #fff;
    border-radius: 16rpx;
    /deep/.u-form-item--right__content__slot {
      display: flex;
      flex-direction: column;
    }
    .h2 {
      width: 100%;
      padding: 24rpx;
      font-size: 32rpx;
      line-height: 40rpx;
      color: $u-main-color;
    }
    .u-upload {
      margin: 24rpx 0 48rpx;
    }
    .h3 {
      width: 100%;
      padding: 24rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
    .ul {
      display: flex;
      justify-content: space-between;
      padding: 0 24rpx 24rpx;
      width: 100%;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;
      .li {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1rpx solid #dcdcdc;
      }
      .li-tips {
        padding: 8rpx 0;
        width: 96rpx;
      }
    }

    .contact {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 24rpx 24rpx;
      padding: 16rpx;
      width: calc(100% - 48rpx);
      background: #f5f5f5;
      border-radius: 8rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-content-color;
      .contact-btn {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 24rpx;
        width: 200rpx;
        height: 64rpx;
        border-radius: 32rpx;
        background: $u-type-primary;
        font-size: 24rpx;
        line-height: 32rpx;
        color: #ffffff;
        .u-image {
          margin-right: 8rpx;
        }
      }
    }
  }

  .basics-info-title {
    padding: 24rpx;
    font-size: 32rpx;
    line-height: 40rpx;
    color: $u-content-color;
  }
  .basics-info-wrap {
    margin: 24rpx 24rpx 120rpx;
    padding: 0 24rpx;
    background: #fff;
    border-radius: 16rpx;
  }

  .more-wrap {
    display: flex;
    justify-content: center;
    padding: 32rpx;
    .more-btn {
      display: flex;
      align-items: center;
      margin-right: 12rpx;
      padding: 14rpx 32rpx;
      background: #f5f5f5;
      border-radius: 48rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
    padding: 16rpx 24rpx 0;
    width: 100%;
    border-top: 1rpx solid #e0e0e0;
    background: #f7f7f7;
  }
</style>

<template>
  <view class="page">
    <view class="order-state-wrap">
      <view class="order-state">
        <view class="order-state-t">{{ cartDetail.state ? '支付成功' : '待支付' }}</view>
        <view class="order-state-b">{{
          cartDetail.state ? '订单已完成，谢谢您的支持' : '订单待支付'
        }}</view>
      </view>
      <u-image width="152rpx" height="120rpx" :src="`${ossUrl}order-detail-1.png`"></u-image>
    </view>
    <view class="order-wrap">
      <view class="order-header">
        <view class="order-header-l">报名编号：{{ cartDetail.orderNo }}</view>
      </view>
      <view class="order-content-wrap">
        <u-image width="216rpx" height="144rpx" :src="cartDetail.imgUrl"></u-image>
        <view class="order-content">
          <view class="order-content-t"
            >{{ cartDetail.professionalName }}/{{ cartDetail.levelName }}</view
          >
          <view class="order-content-m">报名时间：{{ cartDetail.addTime | filterDay }}</view>
          <view class="order-content-m">支付方式：微信支付</view>
          <view class="order-content-b">
            <text class="order-content-b-l">实付金额：</text>
            <text class="order-content-b-r">¥{{ cartDetail.supervisorCost | calcPrice }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="order-info-wrap">
      <view class="order-info-header">
        <view class="order-info-title">报名信息</view>
        <u-button class="order-info-editor" plain type="primary" shape="circle" @click="routerApply"
          >修改扩展信息
        </u-button>
      </view>
      <view class="order-info">
        <view class="order-info-li">
          <view class="order-info-li-l">姓名</view>
          <view class="order-info-li-r">{{ cartDetail.name }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">身份证号</view>
          <view class="order-info-li-r">{{ cartDetail.idcard }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">证件照</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.idcard }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">文化程度</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.education }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">考生来源</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.studentSource }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">证书领取</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.certificateReceive }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">职业名称</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.professional }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">所在单位</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.companyName }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">所在城市</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.city }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">工种名称</view>
          <view class="order-info-li-r">{{ cartDetail.professionalName }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">参加工作</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.workStartTime }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">从事专业</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.workStartTime }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">专业年限</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.workingLife }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">民族</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.nation }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">政治面貌</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.politicalLandscape }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">简要经历</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.politicalLandscape }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">邮政编码</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.postalCode }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">通讯地址</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.address }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">邮寄地址</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.mailAddress }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">邮箱</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.mail }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">户籍所在地</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.permanentaddress }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">原证书职业</view>
          <view class="order-info-li-r">
            {{ cartDetail.examineScheduleVO.originalProfessionName }}
          </view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">原证书等级</view>
          <view class="order-info-li-r">{{ cartDetail.examineScheduleVO.originalLevel }}</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">原证书编号</view>
          <view class="order-info-li-r">
            {{ cartDetail.examineScheduleVO.originalCertificateId }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  import dayjs from 'dayjs';
  import commonInfo from '@/util/commonInfo';
  import { queryCertificatereservation } from '@/util/ajax/services';
  export default {
    filters: {
      filterDay(val) {
        return dayjs(Number(val)).format('YYYY年MM月DD日');
      },
      calcPrice(val) {
        return commonInfo.calcPrice(val);
      },
    },
    data() {
      return {
        ossUrl: config.ossUrl,
        cartDetail: {
          examineScheduleVO: {},
        },
      };
    },
    onLoad(options) {
      this.queryCertificatereservationApi(options);
    },
    methods: {
      routerApply() {
        let params = {
          id: this.cartDetail.id,
          certName: this.cartDetail.professionalName,
          edit: true,
        };
        this.$u.route({
          url: '/pages/apply/apply_2',
          params: params,
        });
      },
      async queryCertificatereservationApi(params) {
        let res = await queryCertificatereservation(params);
        this.cartDetail = res.data;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>

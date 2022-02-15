import request from './request.js';

const Http = {
  get(url, params) {
    return request.post(url, params, false);
  },
  post(url, params, shallow, showLoading = true) {
    return request.post(url, params, false, shallow, showLoading);
  },
  up(url, file) {
    return request.upload(url, file, false);
  },
};

/* 登录 */
export const getLoginCode = (params) => {
  return Http.post('core/verify/appSend', params, true);
}; //获取登录验证码
export const phoneLogin = (params) => {
  return Http.post(
    params.loginType == 1 ? '/core/oauth/login' : 'core/oauth/phoneLogin',
    params,
    true
  );
}; // 通用手机号+验证码登录注册
export const commonExplicit = (params) => {
  return Http.post('core/grant/commonExplicit', params);
};
//退出登录
export const loginOut = (params) => {
  return Http.post('core/oauth/loginOut', params);
};
//小程序用户通过code检测并初始化
export const miniSilence = (params) => {
  return Http.post('/core/grant/miniSilence', params, true);
};
//用户通过openId,appId进行APP授权
export const miniAuthBind = (params) => {
  return Http.post('/core/grant/miniAuthBind', params, true);
};
export const devicetoken = (params) => {
  return Http.post('core/devicetoken/save', params);
}; //保存手机设备码

//头像上传
export function uploadPic(params) {
  return Http.post('core/upload/uploadPic', params);
}
/**公司**/
/**
 * @description: 查询公司
 */
export function queryCompany(params) {
  return Http.post('/c/company/queryById', params);
}

/**商品供货发布单**/
/**
 * @description: 查询商品发布（包含价格）
 */
export function queryInfoProduct(params) {
  return Http.post('/c/product/queryInfo', params, true);
}
/**
 * @description: 查询商品发布列表(带分页)
 */
export function queryPageListProduct(params) {
  return Http.post('/c/product/queryPageList', params);
}
/**
 * @description: 查询字典列表
 */
export function queryDictionaryProduct(params) {
  return Http.post('/c/product/queryDictionary', params);
}

/**经纬度查询**/
/**
 * @description: 经纬度查询所属商户
 */
export function queryWebsiteInfoSuitedShop(params) {
  return Http.post('/c/suitedshopcontroller/queryTrapeze', params, true);
}

/**商品展示类目**/
/**
 * @description: 查询字典列表
 */
export function queryDictionaryShowCate(params) {
  return Http.post('/c/showcate/queryDictionary', params);
}
/**
 * @description: 查询已发布商品分类列表
 */
export function queryContainProductListShowCate(params) {
  return Http.post('/c/showcate/queryContainProductList', params);
}

/**订单**/
/**
 * @description: 查询订单
 */
export function queryInfoOrder(params, showLoading = true) {
  return Http.post('/c/order/queryInfo', params, true, showLoading);
}
/**
 * @description: 查询订单列表(带分页)
 */
export function queryPageListOrder(params) {
  return Http.post('/c/order/queryPageList', params, true);
}
/**
 * @description: 取消订单
 */
export function cancelOrder(params) {
  return Http.post('/c/order/cancel', params, true);
}
/**
 * @description: 订单退款详情
 */
export function refundCaseOrder(params) {
  return Http.post('/c/order/refundCase', params);
}
/**
 * @description: 订单退款
 */
export function refundOrder(params) {
  return Http.post('/c/order/refund', params, true);
}
/**
 * @description: 修改服务时间
 */
export function updateServiceTimeOrder(params) {
  return Http.post('/c/order/updateServiceTime', params, true);
}
/**
 * @description: 套餐订单进行预约
 */
export function cycleBookOrder(params) {
  return Http.post('/c/order/cycleBook', params, true);
}
/**
 * @description: 订单数量统计
 */
export function countStatisticsOrder(params) {
  return Http.post('/c/order/countStatistics', params);
}
/**
 * @description: 查询订单改约对应的空闲时间段
 */
export function queryTimeFreeOrder(params) {
  return Http.post('/c/order/queryChangeTimeFree', params);
}
/**
 * @description: 创建订单
 */
export function createOrder(params) {
  return Http.post('/c/order/create', params, true);
}

/**雇主**/
/**
 * @description: 修改个人资料
 */
export function updateCustomer(params) {
  return Http.post('/c/customer/update', params);
}
/**
 * @description: 查询雇主
 */
export function queryCustomer(params) {
  return Http.post('/c/customer/query', params);
}

/**店铺**/
/**
 * @description: 查询店铺
 */
export function queryShop(params) {
  return Http.post('/c/shop/query', params);
}

/**任务**/
/**
 * @description: 查询任务日历
 */
export function queryTaskCalendarTask(params) {
  return Http.post('/c/task/queryTaskCalendar', params, true);
}

/**订单分润**/
/**
 * @description: 查询订单分润列表(带分页)
 */
export function queryPageListOrderProfit(params) {
  return Http.post('/c/orderprofit/queryPageList', params);
}

/**保洁服务订单**/
/**
 * @description: 查询工单列表(带分页)
 */
export function queryPageListCleanServiceOrder(params) {
  return Http.post('/c/cleanserviceorder/queryPageList', params);
}
/**
 * @description: 根据订单号查询最近一笔工单
 */
export function queryLastByOrderIdCleanServiceOrder(params) {
  return Http.post('/c/cleanserviceorder/queryLastByOrderId', params);
}
/**
 * @description: 查询工单
 */
export function queryCleanServiceOrder(params) {
  return Http.post('/c/cleanserviceorder/query', params);
}

/**供货参数表**/
/**
 * @description: 查询商品参数
 */
export function queryDetailListProductParam(params) {
  return Http.post('/c/productparam/queryDetailList', params, true);
}

/**首页广告展位分组**/
/**
 * @description: 查询首页
 */
export function queryWebsiteInfoHomepageBoothGroup(params) {
  return Http.post('/c/homepageboothgroup/queryWebsiteInfo', params);
}

/**资金明细**/
/**
 * @description: 查询资金明细列表(带分页)
 */
export function queryPageListGatewayOrder(params) {
  return Http.post('/c/gatewayOrder/queryPageList', params);
}

/**雇主地址**/
/**
 * @description: 查询雇主地址列表(带分页)
 */
export function queryPageListCustomerAddress(params) {
  return Http.post('/c/customeraddress/queryPageList', params);
}
/**
 * @description: 查询雇主可用地址列表(带分页)
 */
export function queryUsableAddressPageListCustomerAddress(params) {
  return Http.post('/c/customeraddress/queryUsableAddressPageList', params);
}
/**
 * @description: 新增雇主地址
 */
export function addCustomerAddress(params) {
  return Http.post('/c/customeraddress/add', params, true);
}
/**
 * @description: 修改雇主地址
 */
export function updateCustomerAddress(params) {
  return Http.post('/c/customeraddress/update', params, true);
}
/**
 * @description: 删除雇主地址
 */
export function deleteCustomerAddress(params) {
  return Http.post('/c/customeraddress/delete', params);
}
/**
 * @description: 查询雇主地址
 */
export function queryCustomerAddress(params) {
  return Http.post('/c/customeraddress/query', params);
}

/**电子合同**/
/**
 * @description: 签署电子合同
 */
export function signElecContract(params) {
  return Http.post('/c/eleccontract/sign', params);
}
/**
 * @description: 查询电子合同
 */
export function queryElecContractByIdElecContract(params) {
  return Http.post('/c/eleccontract/queryElecContractById', params);
}
/**
 * @description: 获取编辑中电子合同预览
 */
export function getElecContractHtmlElecContract(params) {
  return Http.post('/c/eleccontract/getElecContractHtml', params);
}

/**记账本明细**/
/**
 * @description: 查询记账本明细列表(带分页)
 */
export function queryPageListBookkeep(params) {
  return Http.post('/c/bookkeep/queryPageList', params);
}

/**线索单**/
/**
 * @description: 查询列表(带分页)
 */
export function queryPageListClue(params) {
  return Http.post('/c/clue/queryPageList', params, true);
}
/**
 * @description: 留言新增线索单
 */
export function msgCreateClue(params) {
  return Http.post('/c/clue/msgCreate', params);
}
/**
 * @description: 留言新增线索升级
 */
export function msgCreateNewClue(params) {
  return Http.post('/c/clue/msgCreateNew', params);
}
/**
 * @description: 自主填需求创建线索单
 */
export function noLoginCreateClueClue(params) {
  return Http.post('/c/clue/demandCreateClue', params);
}
/**
 * @description: 新增线索单
 */
export function createClue(params, showLoading = true) {
  return Http.post('/c/clue/create', params, true, showLoading);
}
/**
 * @description: 查询线索
 */
export function queryClue(params) {
  return Http.post('/c/clue/query', params, true);
}

/**优惠券**/
/**
 * @description: 领取优惠券
 */
export function receiveCoupon(params) {
  return Http.post('/c/coupon/receive', params, true);
}
/**
 * @description: 查询已领取的优惠券列表(带分页)
 */
export function queryReceivedPageListCoupon(params) {
  return Http.post('/c/coupon/queryReceivedPageList', params);
}
/**
 * @description: 查询
 */
export function queryCoupon(params) {
  return Http.post('/c/coupon/queryInfo', params);
}

/**维修上门收费**/
/**
 * @description: 根据订单号查询维修上门收费
 */
export function queryByCleanOrderIdRepairReceipt(params) {
  return Http.post('/c/repairreceipt/queryByOrderId', params);
}

/**账户信息**/
/**
 * @description: 查询账户详细信息接口
 */
export function queryAuntDetailAccount(params) {
  return Http.post('/c/account/queryAccountDetail', params);
}

/**阿姨基本信息**/
/**
 * @description: 查询阿姨基本信息列表(带分页)
 */
export function queryPageListAuntInfo(params) {
  return Http.post('/c/auntinfo/queryPageList', params);
}
/**
 * @description: 查询阿姨基本信息
 */
export function queryAuntInfo(params) {
  return Http.post('/c/auntinfo/query', params);
}

/**优惠券发行**/
/**
 * @description: 查询优惠券发行
 */
export function queryInfoCouponPublish(params) {
  return Http.post('/c/couponpublish/queryInfo', params);
}
/**
 * @description: 查询优惠券发行列表(带分页)
 */
export function queryInfoPageListCouponPublish(params) {
  return Http.post('/c/couponpublish/queryInfoPageList', params);
}

/**凤凰会**/
/**
 * @description: 查询凤凰会订单列表地址
 */
export function queryPhonixOrderUrlPhonix(params) {
  return Http.post('/c/phonix/queryPhonixOrderUrl', params);
}

/**订单评价**/
/**
 * @description: 新增订单评价
 */
export function addOrderReview(params) {
  return Http.post('/c/orderreview/add', params);
}
/**
 * @description: 查询订单评价
 */
export function queryOrderReview(params) {
  return Http.post('/c/orderreview/query', params);
}

/**合同**/
/**
 * @description: 查询合同列表(带分页)
 */
export function queryPageListContract(params) {
  return Http.post('/c/contract/queryPageList', params);
}
/**
 * @description: 新增合同
 */
export function addContract(params) {
  return Http.post('/c/contract/add', params);
}
/**
 * @description: 修改合同
 */
export function updateContract(params) {
  return Http.post('/c/contract/update', params);
}
/**
 * @description: 删除合同
 */
export function deleteContract(params) {
  return Http.post('/c/contract/delete', params);
}
/**
 * @description: 查询合同
 */
export function queryContract(params) {
  return Http.post('/c/contract/query', params);
}

/**官网公司介绍**/
/**
 * @description: 查询官网公司介绍
 */
export function queryWebsiteCompany(params) {
  return Http.post('/c/websitecompany/query', params);
}

/**订单跟踪**/
/**
 * @description: 查询订单跟踪列表(带分页)
 */
export function queryPageListOrderFollow(params) {
  return Http.post('/c/orderfollow/queryPageList', params);
}

/**
 * @description: 查询商品发布单详细介绍
 */
export function queryProductDetail(params) {
  return Http.post('/c/productdetail/query', params, true);
}

/**
 * @description: 根据经纬度半径获取附近兴趣点
 */
export function queryGeoPlacceAround(params) {
  return Http.post('/geo/place/around', params);
}

/**
 * @description: 根据订单发起支付，同时生成充值单并返回
 */
export function buildOrder(params) {
  return Http.post('/core/pay/buildOrder', params, true);
}

/**
 * @description: 消息通知列表
 */
export function getMessage(params) {
  return Http.post('/core/sitemessage/queryPageList', params, true);
}

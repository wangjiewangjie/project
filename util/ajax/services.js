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
export const loginByOpenId = (params) => {
  return Http.post('/core/grant/loginByOpenId', params, true);
};
//用户通过openId,appId进行APP授权
export const miniAuthBind = (params) => {
  return Http.post('/core/grant/miniAuthBind', params, true);
};

export const queryExamIneScheduleList = (params) => {
  return Http.post('/s/examineschedule/queryList', params, true);
};

/* apply-1 */
export const addCertificatereservation = (params) => {
  return Http.post('/s/certificatereservation/add', params, true);
};
/* apply-2 */
export const updateStudentInfo = (params) => {
  return Http.post('/s/certificatereservation/updateStudentInfo', params, true);
};
/* apply-3 */
export const queryCertificatereservation = (params) => {
  return Http.post('/s/certificatereservation/query', params, true);
};

export const queryCertTypeList = (params) => {
  return Http.post('/s/certificate/queryCertTypeList', params, true);
};

export const queryDistancePageList = (params) => {
  return Http.post('/s/school/queryDistancePageList', params, true);
};

export const queryCertificateList = (params) => {
  return Http.post('/s/certificate/queryList', params, true);
};

export const queryExaminestudentScore = (params) => {
  return Http.post('/s/examinestudent/queryScore', params, true);
}; //查询证书成绩

export const queryAdvertisingList = (params) => {
  return Http.post('/s/advertising/queryPageList', params, true);
}; //广告

export const queryInfoByCertId = (params) => {
  return Http.post('/s/examinecertpaper/queryInfoByCertId', params, true);
}; //查询考试信息

export const loadExaminePaper = (params) => {
  return Http.post('/s/examinecertpaper/loadExaminePaper', params, true);
}; //加载考试试卷

export const submitSingleQuestion = (params) => {
  return Http.post('/s/examinecertpaper/submitSingleQuestion', params, true);
}; //提交单个考题

export const submitPaper = (params) => {
  return Http.post('/s/examinecertpaper/submitPaper', params, true);
}; //提交试卷

export const queryExaminecertpaper = (params) => {
  return Http.post('/s/examinecertpaper/query', params, true);
}; //查询正确错误

export const queryCertmocktestpaper = (params) => {
  return Http.post('/s/certmocktestpaper/query', params, true);
}; //查询证书模拟试卷

export const pullRandomMockTestPater = (params) => {
  return Http.post('/s/certmocktestpaper/pullRandomMockTestPater', params, true);
}; //查询证书模拟试卷

export const startExamine = (params) => {
  return Http.post('/s/examinecertpaper/startExamine', params, true);
}; //查询证书模拟试卷

export const createMockTestExaminePaper = (params) => {
  return Http.post('/s/examinecertpaper/createMockTestExaminePaper', params, true);
}; //查询证书模拟试卷

export const queryConfiguration = (params) => {
  return Http.post('/s/configuration/queryHomePageList', params, true);
}; //查询小程序自定义展示配置
export const queryInformationPageList = (params) => {
  return Http.post('/s/information/queryPageList', params, true);
}; //查询栏目列表列表(带分页)

export const buildOrder = (params) => {
  return Http.post('/core/pay/buildOrder', params, true);
}; //创建订单

export const queryCertificatereservationPageList = (params) => {
  return Http.post('/s/certificatereservation/queryPageList', params, true);
}; //查询证书预约表列表(带分页)

export const queryCertificate = (params) => {
  return Http.post('/s/certificate/query', params, true);
}; //查询证书预约

export const queryCertificatePageList = (params) => {
  return Http.post('/s/certificate/queryPageList', params, true);
}; //查询证书预约

export const deleteCert = (params) => {
  return Http.post('/s/certificatereservation/delete', params, true);
}; //删除证书预约表

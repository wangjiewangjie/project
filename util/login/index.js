import config from '@/config/config';
import { miniSilence } from '@/util/ajax/services';

/**
 * 微信小程序通过code静默授权获取openid
 */
export async function getOpenId() {
  const [err, result] = await uni.login();
  if (err) {
    return;
  }
  const res = await miniSilence({
    appId: config.miniAppId,
    code: result.code,
    companyId: 'G00001',
  });
  return res;
}

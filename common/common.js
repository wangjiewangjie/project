function testUA(str) {
  return navigator.userAgent.indexOf(str) > -1;
}
const common = {
  isNewIphone:
    window &&
    testUA("iPhone") &&
    window.screen.height >= 812 &&
    window.devicePixelRatio >= 2, //是不是最新iphone
};
export default common;

//手机号中间四位显示*
export const showPartialPhone = (value, showInBegin = 3, showAtEnd = 4) => {
  if (!value) {
    return '';
  }
  return (
    value.slice(0, showInBegin) +
    '*'.repeat(value.length - showAtEnd - showInBegin) +
    value.slice(-showAtEnd)
  );
};

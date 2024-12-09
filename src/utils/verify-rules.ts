// 手机号
export const phoneNumberVerify = (str: string) => {
  return /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(
    str
  );
};

// 网站链接
export const webLinkVerify = (str: string) => {
  return /^(https?:\/\/)/.test(str);
};

// 安卓正则
export const androidVerify = (str: string) => {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)\.apk$/.test(str);
};

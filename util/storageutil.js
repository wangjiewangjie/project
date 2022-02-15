let storage = {};

storage.set = (key, data) => {
  uni.removeStorageSync(key);
  uni.setStorageSync(key, data);
};

storage.get = (key) => {
  const data = uni.getStorageSync(key);
  return data || '';
};

export default storage;

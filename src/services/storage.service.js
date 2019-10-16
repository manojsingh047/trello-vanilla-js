import { LOCAL_STORAGE_KEY } from "../store/config";

const getData = () => {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
};

const postData = data => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, data);
};

const initStorageData = () => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
};

export { getData, postData, initStorageData };

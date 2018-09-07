import Vue from 'vue'
import {Toast} from 'vant';
import vueResource  from 'vue-resource';

Vue.use(vueResource)
Vue.http.options.emulateJSON = true;
const baseURL = "http://localhost:6060/";
const loadOption = {
  mask: true,
  duration: 0,       // 持续展示 toast
  forbidClick: true, // 禁用背景点击
  message: '加载中...'
}

function post(url, params) {
  url=baseURL+url;
  let toast = Toast.loading(loadOption);
  return new Promise((resolve, reject) => {
    Vue.http.post(url, params)
      .then(response => {
        if(!response.data.success){
          Toast.fail(response.data.msg);
        }else{
          resolve(response);
        }
        toast.clear()
      }, err => {
        toast.clear();
        Toast.fail('系统错误');
        reject(err);
      })
      .catch((error) => {
        toast.clear();
        Toast.fail('系统错误');
        reject(error);
      })
  })
}

function postNoMsg(url, params) {
  url=baseURL+url;
  return new Promise((resolve, reject) => {
    Vue.http.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
function getUrl(){
  return baseURL;
}


export default {
  post(url, params){
    return post(url,params);
  },
  postNoMsg(url, params){
    return postNoMsg(url,params);
  },
  getUrl(){
    return getUrl()
  }
}

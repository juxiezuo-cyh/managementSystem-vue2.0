// api接口文件
import axios from "axios";
axios.defaults.baseURL = "http://keybuffer.cn:8082";

export function fetch(url, params) {
  return axios.get(url, { params: params }).then(res => res.data);
}

export function fetchPost(url, params) {
  return axios.post(url, params).then(res => res.data);
}

export default {
  
  soList(params) {
    return fetchPost("/question/so-list", params);
  },
  // 状态流程
  soStep(params) {
    return fetchPost("/question/so-step", params);
  },
  // 保存编辑后的原始内容
  soSaveRaw(params) {
    return fetchPost("/question/so-save-raw", params);
  },
  // 翻译问题
  soTrans(params) {
    return fetchPost("/question/so-trans", params);
  },
  // 展示已翻译问题接 
  soShowTrans(params) {
    return fetchPost("/question/so-show-trans", params);
  },
  // 保存对翻译问题的修改
  soTransSave(params) {
    return fetchPost("/question/so-trans-save", params);
  },
  // 已翻译问题上线
  soOnLine(params) {
    return fetchPost("/question/so-online", params);
  },
  // 问题下线 
  soDelete(params) {
    return fetchPost("/question/so-delete", params);
  }
};

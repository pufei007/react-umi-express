import request from "../../../utils/request";
import qs from "qs";

//获取用户信息
export function getInfo(params) {
  return request(`/lists?${qs.stringify(params)}`, {
    method: "get"
  });
}
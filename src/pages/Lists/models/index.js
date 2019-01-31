import {
  getInfo
} from "../services/index";
import { common } from "~/framework";
const { message } = common;

export default {
  namespace: "Lists",
  state: {
    listData: []
  },

  subscriptions: {
    setup({ history, dispatch }) {

    },
  },

  effects: {
    //获取用户权限
    *getInfo({ payload }, { call, put }) {
      const { res, err } = yield call(getInfo, payload);
      console.log(res)
      if (res.success) {
        message.success('获取数据成功')
        yield put({
          type: "saveListData",
          payload: {
            listData: res.data.menu
          }
        });
      } else {
        message.error('获取数据失败')
      }
    },
  },

  reducers: {
    saveListData(state, action) {
      return { ...state, listData: action.payload.listData };
    },
  }
};

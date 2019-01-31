import { Modal as ModalAntd} from "antd";
import { utils } from "./index";

//通用模态窗口消息————按名称排序
const Modal = {
  //确认模态窗口
  confirm: (content = "", okCallback, cancelCallback, title) => {
    try {
      ModalAntd.confirm({
        title: title,
        content: content,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          if (typeof okCallback === "function") {
            okCallback();
          }
        },
        onCancel: () => {
          if (typeof cancelCallback === "function") {
            cancelCallback();
          }
        }
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //错误模态窗口
  error: (content = "", okCallback, title) => {
    try {
      ModalAntd.error({
        title: title,
        content: content,
        okText: "确认",
        onOk: () => {
          if (typeof okCallback === "function") {
            okCallback();
          }
        }
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //提示模态窗口
  info: (content = "", okCallback, title) => {
    try {
      ModalAntd.info({
        title: title,
        content: content,
        okText: "确认",
        onOk: () => {
          if (typeof okCallback === "function") {
            okCallback();
          }
        }
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //成功模态窗口
  success: (content = "", okCallback, title) => {
    try {
      ModalAntd.success({
        title: title,
        content: content,
        okText: "确认",
        onOk: () => {
          if (typeof okCallback === "function") {
            okCallback();
          }
        }
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //警告模态窗口
  warning: (content = "", okCallback, title) => {
    try {
      ModalAntd.warning({
        title: title,
        content: content,
        okText: "确认",
        onOk: () => {
          if (typeof okCallback === "function") {
            okCallback();
          }
        }
      });
    } catch (e) {
      utils.throwError(e);
    }
  }
};

export default Modal;

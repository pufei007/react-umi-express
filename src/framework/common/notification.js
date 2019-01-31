import { notification as AntdNotification } from "antd";
import { utils } from "./index";

//通用提醒消息方法————按方法名称排序
const notification = {
  //错误
  error: (message, title, extraParams) => {
    notification.show("error", message, title, extraParams);
  },
  //提示
  info: (message, title, extraParams) => {
    notification.show("info", message, title, extraParams);
  },
  //显示
  show: (type, message, title, extraParams) => {
    try {
      const defaultParam = {
        //自定义关闭按钮
        btn: "",
        //自定义 CSS class
        className: "",
        //默认 4.5 秒后自动关闭，配置为 null 则不自动关闭
        duration: 4.5,
        //自定义图标
        icon: null,
        //当前通知唯一标志
        key: "",
        //弹出位置，可选 topLeft topRight bottomLeft bottomRight
        placement: "topRight",
        //自定义内联样式
        style: null,
        //点击默认关闭按钮时触发的回调函数
        onClose: null
      };
      extraParams = Object.assign({}, defaultParam, extraParams);
      AntdNotification[type]({
        message: title,
        description: message,
        btn: extraParams.btn,
        className: extraParams.className,
        duration: extraParams.duration,
        icon: extraParams.icon,
        key: extraParams.key,
        placement: extraParams.placement,
        style: extraParams.style,
        onClose: () => {
          if (typeof extraParams.onClose === "function") {
            extraParams.onClose();
          }
        }
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //成功
  success: (message, title, extraParams) => {
    notification.show("success", message, title, extraParams);
  },
  //警告
  warning: (message, title, extraParams) => {
    notification.show("warning", message, title, extraParams);
  }
};

export default notification;

import { message as messageAntd} from "antd";
messageAntd.config({
  top: 50,
  duration: 2,
  maxCount: 3,
});
//通用模态窗口消息————按名称排序
const message = {
  //成功
  success: (content, duration, onClose) => {
    messageAntd.success(content, duration, onClose);
  },
  //成功
  error: (content, duration, onClose) => {
    messageAntd.error(content, duration, onClose);
  },
  //成功
  warning: (content, duration, onClose) => {
    messageAntd.warning(content, duration, onClose);
  },
  
};

export default message;

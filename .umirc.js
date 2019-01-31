
// ref: https://umijs.org/config/
import path from "path";
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'create',
      dll: false,
      hardSource: false,
      locale: {
        antd: true,
        default: "zh-CN",
        baseNavigator: true // default true, when it is true, will use `navigator.language` overwrite default
        // antd: true, // use antd, default is true
      },
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
  targets: {
    ie: 9
  },
  theme: {
    "@primary-color": "#387EE8"
  },
  alias: {
    "~": path.resolve("src")
  },
  exportStatic: {},
  "proxy": {
    "/api": {
      "target": "http://192.168.0.58:3001/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}

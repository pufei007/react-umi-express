/*
 * @Author: PUFEI
 * @Date: 2018-07-24 15:38:19
 * @Last Modified by: PUFEI
 * @Last Modified time: 2019-01-28 10:05:52
 */
import React from "react";
import withRouter from "umi/withRouter";
import router from "umi/router";
import { connect } from "dva";
import { Layout, Menu } from "antd";
import styles from "./index.less";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MenuSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSiderCollapsed: false,
      current: "",
      openKeys: []
    };
    this.SubMenuKeys = [];
  }
  menuClick(e) {
    router.push(e.item.props.url);
    // this.props.dispatch({
    //   type: "Global/saveCurrent",
    //   params: {
    //     current: e.item.props.url
    //   }
    // });
    // router.push()
    // this.setState({
    //   current: e.item.props.url
    // });
  }
  toggle = () => {
    this.setState({ menuSiderCollapsed: !this.state.menuSiderCollapsed });
  };
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.SubMenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  render() {
    let role = this.props.roleMenu;
    let local = window.location.pathname;
    let siderMenu;
    if (local !== "Login") {
      for (let i = 0; i < role.length; i++) {
        if (local.indexOf(role[i].url) !== -1) {
          siderMenu = [];
          siderMenu = role[i].children;
        } else {
        }
      }
    } else {
      siderMenu = [];
    }
    function renderMenuItems(menu, collapsed) {
      return menu.map(item => {
        if (item.children && item.children[0].type === "0") {
          if (item.type === "0") {
            return (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <i
                      className={`iconfont ${
                        item.icon ? item.icon : "icon-liebiao3"
                        }`}
                      style={{ fontSize: ".7rem", marginRight: ".2rem" }}
                    />
                    <span>{!collapsed ? item.name : ""}</span>
                  </span>
                }
              >
                {item.type === "0" ? renderMenuItems(item.children) : null}
              </SubMenu>
            );
          }
        } else {
          if (item.type === "0") {
            return (
              <Menu.Item
                key={item.url}
                url={item.url ? item.url : null}
                title={item.name}
              >
                <i
                  className={`iconfont ${
                    item.icon ? item.icon : "icon-liebiao3"
                    }`}
                  style={{ fontSize: ".6rem", marginRight: ".2rem" }}
                />
                <span>{!collapsed ? item.name : ""}</span>
              </Menu.Item>
            );
          }
        }
      });
    }

    if (siderMenu && siderMenu.length !== 0) {
      for (let j = 0; j < siderMenu.length; j++) {
        if (siderMenu[j].type === "1") {
          this.SubMenuKeys.push(siderMenu[j].id);
        }
      }
    }

    const jsx = (
      <div className={styles.siderMain}>
        <Sider
          trigger={null}
          collapsible
          onCollapse={this.onCollapse}
          collapsed={this.state.menuSiderCollapsed}
          width="176"
          collapsedWidth="2.5rem"
        >
          <div
            className={styles.toggle}
            onClick={this.toggle}
            title={this.state.menuSiderCollapsed ? "展开" : "收起"}
          >
            <i
              className={`iconfont ${
                this.state.menuSiderCollapsed
                  ? "icon-weibiaoti25"
                  : "icon-weibiaoti26"
                }`}
              style={{ fontSize: ".6rem" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            onOpenChange={this.onOpenChange}
            selectedKeys={[
              // this.props.current ? this.props.current : window.location.pathname
              window.location.pathname
            ]}
            onClick={this.menuClick.bind(this)}
          >
            {siderMenu
              ? renderMenuItems(siderMenu, this.state.menuSiderCollapsed)
              : null}
          </Menu>
        </Sider>
      </div>
    );
    return jsx;
  }
}

function mapStateToProps(state) {
  return { ...state.Global };
}

export default withRouter(connect(mapStateToProps)(MenuSider));

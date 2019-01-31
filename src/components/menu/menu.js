/*
 * @Author: PUFEI
 * @Date: 2018-07-25 17:36:07
 * @Last Modified by: PUFEI
 * @Last Modified time: 2019-01-30 14:17:07
 */
import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { Menu, Row, Col, Dropdown, Icon } from 'antd';
import router from 'umi/router';
import styles from './index.less';
import _ from 'lodash';
import { FormattedMessage, setLocale, common } from '~/framework';
const { notification } = common;
const storage = window.localStorage;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: storage.getItem('umi_locale') === 'en-US' ? '中文' : 'english',
      menu: 'mail',
    };
  }
  componentDidMount() {}
  changeLocale = () => {
    let locale = storage.getItem('umi_locale');
    if (locale) {
      if (locale === 'en-US') {
        storage.setItem('umi_locale', 'zh-CN');
        setLocale('zh-CN');
      } else {
        storage.setItem('umi_locale', 'en-US');
        setLocale('en-US');
      }
    } else {
      setLocale('en-US');
      storage.setItem('umi_locale', 'en-US');
    }
  };
  haha = () => {
    window.location.href = 'about:blank';
    window.opener = null;
    window.open('', '_self');
    window.close();
  };
  //退出
  out = () => {
    this.props.dispatch({
      type: 'Login/Out',
      payload: {},
    });
    this.props.dispatch({
      type: 'Global/out',
      payload: {},
    });
  };
  handleClick = e => {
    this.setState({
      menu: e.key,
    });
    router.push(e.key);
  };
  toSetting = () => {
    router.push('/Setting');
  };

  render() {
    const menu = (
      <Menu className={styles.personMore}>
        <Menu.Item>
          <a>个人中心</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.toSetting}>个人设置</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.out}>
            退出
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col
            xs={{ span: 0 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            xl={{ span: 8 }}
            style={{ height: '2.5rem', lineHeight: '2.5rem' }}
          >
            <div className={styles.logo}>
              <img src={require('../../assets/commons/logo.png')} alt="1" />
            </div>
            <span className={styles.name}>
              <FormattedMessage id="Framework.Title" />
            </span>
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 16 }}
            lg={{ span: 12 }}
            xl={{ span: 8 }}
            style={{ height: '2.5rem' }}
          >
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.state.menu]}
              className={styles.menu}
              onClick={this.handleClick}
            >
              <Menu.Item key="Lists">
                <Icon type="mail" />
                房间管理
              </Menu.Item>
              <Menu.Item key="Users">
                <Icon type="appstore" />
                用户中心
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            xs={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ span: 6 }}
            xl={{ span: 8 }}
            className={styles.icons}
            style={{ height: '2.5rem' }}
          >
            <Dropdown overlay={menu} trigger={['click']}>
              <div
                style={{ width: '6rem', textAlign: 'center' }}
                title="设置"
                className={styles.set}
              >
                <i
                  className="iconfont icon-wode"
                  style={{ fontSize: '.7rem', marginRight: '.2rem', float: 'left' }}
                />
                <span>admin</span>
                <i className="iconfont icon-plus-select-down" style={{ fontSize: '.7rem' }} />
              </div>
            </Dropdown>
            <div onClick={this.haha} title="消息" className={styles.message}>
              <i className="iconfont icon-tongzhi-hui" style={{ fontSize: '.8rem' }} />
            </div>
            <ul className={styles.person}>
              <li onClick={this.changeLocale} title="切换中英文">
                {this.state.locale}
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state, ...state.Global };
}

export default connect(mapStateToProps)(withRouter(Home));

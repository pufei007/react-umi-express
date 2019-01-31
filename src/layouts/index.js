// import styles from './index.css';
// import {Menu} from 'antd';
// import { Bootstrap } from "~/framework";
// function BasicLayout(props) {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to umi!</h1>
//       { props.children }
//     </div>
//   );
// }

// export default BasicLayout;
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Helmet } from 'react-helmet';
import styles from './index.less';
import { Bootstrap } from '~/framework';
import MainMenu from '../components/menu/menu';
export default withRouter(
  connect(({ loading }) => {
    return { loading };
  })(function({ loading, location, children }) {
    return (
      <LocaleProvider locale={zhCN}>
        <Bootstrap>
          <Layout>
            <Layout.Header className={styles.header}>
              <Helmet>
                <title>服务平台</title>
                <link rel="icon" href="/public/favicon.ico" type="image/x-icon" />
                <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" />
              </Helmet>
              <MainMenu />
            </Layout.Header>
            <Layout.Content className={styles.Content}>
              {children}
            </Layout.Content>
          </Layout>
        </Bootstrap>
      </LocaleProvider>
    );
  })
);

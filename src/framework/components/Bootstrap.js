import { connect } from 'dva';
import nprogress from 'nprogress';
import styles from './Bootstrap.less';
export default connect(({ loading }) => { return { loading }; })(function ({ loading, location, children }) {
    nprogress.start();
    if (!loading.global) {
        nprogress.done();
    }
    return (children);
});


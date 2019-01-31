import React, { Component } from 'react';
import withRouter from 'umi/withRouter';
import { Table, Divider } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.dispatch({
			type: 'Users/getInfo',
			payload: {},
		});
	}
	render() {
		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '手机',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '描述',
				dataIndex: 'remark',
				key: 'remark',
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<a href="javascript:;">更新</a>
						<Divider type="vertical" />
						<a href="javascript:;">删除</a>
					</span>
				),
			},
		];

		const data = [];
		let menu = this.props.userMenu;
		for (let i = 0; i < menu.length; i++) {
			data.push({
				key: menu[i].id,
				name: menu[i].name,
				remark: menu[i].account,
				phone: menu[i].phone,
				email: menu[i].email,
			});
		}
		return (
			<div className="pageDiv">
				{/* <div className={styles.title}>房间管理页面</div> */}
				<div className={styles.content}>
					<Table dataSource={data} columns={columns} />
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { ...state.Users };
}

export default withRouter(connect(mapStateToProps)(index));

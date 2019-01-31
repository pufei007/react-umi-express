import React, { Component } from 'react';
import withRouter from "umi/withRouter";
import {
	Button, Table, Divider, Tag
} from "antd";
import { connect } from "dva";
import styles from './index.less'

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.dispatch({
			type: "Lists/getInfo",
			payload: {
			}
		});
	}
	render() {
		const columns = [{
			title: '房间号',
			dataIndex: 'num',
			key: 'num',
		}, {
			title: '名称',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '类型',
			dataIndex: 'type',
			key: 'type',
		}, {
			title: '描述',
			dataIndex: 'remark',
			key: 'remark',
		}, {
			title: '位置',
			dataIndex: 'location',
			key: 'location',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span>
					<a href="javascript:;">更新</a>
					<Divider type="vertical" />
					<a href="javascript:;">删除</a>
				</span>
			),
		}];

		const data = [];
		let menu = this.props.listData
		for (let i = 0; i < menu.length; i++) {
			data.push({
				key: menu[i].id,
				num: menu[i].no,
				name: menu[i].name,
				type: menu[i].roomType,
				remark: menu[i].descr,
				location: menu[i].position,
			})
		}

		return (
			<div className='pageDiv'>
				<div className={styles.title}>房间管理页面</div>
				<div className={styles.content}>
					<Table dataSource={data} columns={columns} />
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { ...state.Lists };
}

export default withRouter(connect(mapStateToProps)(index));
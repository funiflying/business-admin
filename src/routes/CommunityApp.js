import React from 'react';
import { connect } from 'dva';
import { Table,Tag,Popconfirm} from 'antd';
import { routerRedux } from 'dva/router';
import SearchComponent from '../components/Service/CommunitySearch';
import AuditModel from '../components/Service/CommunityAppAudit';

import styles from './Company.less'
function App({dispatch,list,loading,page,size}) {
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/service/community/app',
            query: { page,size }
        }));
    }
    function search(name) {
        dispatch({
            type: 'communityApp/fetch',
            payload: name ,
        });
    }
    function editHandler(values) {
        dispatch({
            type: 'communityApp/patch',
            payload: values,
        });
    }
    const columns = [
        {
            title: '企业名称',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '社区名称',
            dataIndex: 'communityName',
            key: 'communityName',
        },
        {
            title: '联系人',
            dataIndex: 'contract',
            key: 'contract'
        },
        {
            title: '联系人电话',
            dataIndex: 'contractPhone',
            key: 'contractPhone'
        },
        {
            title: '设备名称',
            dataIndex: 'thirdName',
            key: 'thirdName'
        },
        {
            title: '设备数量',
            dataIndex: 'deviceCount',
            key: 'deviceCount'
        },
        {
            title: '设备类型',
            dataIndex: 'deviceType',
            key: 'deviceType',
            render:(text)=>{
                switch (parseInt(text)){
                    case 1:
                        return "业主端-物业";
                        break;
                    case 2:
                        return "业主端-生活";
                        break;
                    case 11:
                        return "物业端-服务";
                        break;
                    case 12:
                        return "物业端-工作";
                        break;
                    case 0:
                        return "其他";
                        break;
                    default:
                        return "";
                }
            }
        },
        {
            title: '设备状态',
            dataIndex: 'status',
            key: 'status',
            render:(text)=>{
                switch (parseInt(text)){
                    case 1:
                        return <Tag color="green">启用</Tag>;
                        break;
                    case 2:
                        return  <Tag color="red">禁用</Tag>;
                        break;
                    case -1:
                        return  <Tag color="orange">驳回</Tag>;
                        break;
                    case 0:
                        return  <Tag color="purple">待审</Tag>;
                        break;
                    default:
                        return "";
                }
            }
        },
        {
            title: '操作',
            key: 'operation',
            width:'10%',
            render:(record)=>{
                switch (parseInt(record.status)){
                    case 0:
                        return (<div className={styles['antd-operation-link']}>
                            <AuditModel record={record} onOk={editHandler}>
                                <a href="javascript:void(0)" className={styles['edit-text']}>审核</a>
                            </AuditModel>
                        </div>);
                        break;
                    case 1:
                        return (<div className={styles['antd-operation-link']}>
                            <Popconfirm title="确定禁用" onConfirm={editHandler.bind(null,{...record,status:2})}>
                                <a href="javascript:void(0)" className={styles['text-orange']}>禁用</a>
                            </Popconfirm>
                        </div>);
                        break;
                    case 2:
                        return (<div className={styles['antd-operation-link']}>
                            <Popconfirm title="确定启用" onConfirm={editHandler.bind(null,{...record,status:1})}>
                                <a href="javascript:void(0)" className={styles['text-green']}>启用</a>
                            </Popconfirm>
                        </div>);
                        break;
                }
            }
        },
    ];
    const pagination={
        total:list.count,
        showTotal:(total)=> `共 ${total} 条数据`,
        showSizeChanger:true,
        pageSize:size,
        onShowSizeChange:(current,pageSize)=>{
            dispatch(routerRedux.push({
                pathname: '/service/community/app',
                query: { page:current,size:pageSize },
            }));
        },
        onChange:pageChangeHandler
    };
    return (
        <div>
            <SearchComponent search={search} />
            <Table
                columns={columns}
                dataSource={list.data}
                rowKey={record => record.id}
                pagination={pagination}
                loading={loading}
            />
        </div>
    );
}
function mapStateToProps(state) {
    const { list,page,size} = state.communityApp;
    return {
        loading:state.loading.models.communityApp,
        list,
        page,
        size
    };
}
export default connect(mapStateToProps)(App);
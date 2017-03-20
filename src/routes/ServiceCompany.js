import React from 'react';
import { connect } from 'dva';
import { Table} from 'antd';
import { routerRedux,Link } from 'dva/router';
import SearchComponent from '../components/Service/CompanySearch';
import AuditModel from '../components/Service/CompanyAudit';

import styles from './Company.less'
function Company({dispatch,list,loading,page,size,status}) {
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/service/company',
            query: { page,size }
        }));
    }
    function search(name) {
        dispatch({
            type: 'companyAudit/fetch',
            payload: name ,
        });
    }
    function editHandler(id,values) {
        dispatch({
            type: 'companyAudit/patch',
            payload: { id, ...values },
        });
    }
    const columns = [
        {
            title: '企业名称',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '法人代表',
            dataIndex: 'boss',
            key: 'boss',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '公司地址',
            dataIndex: 'address',
            key: 'address'
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
            title: '备注',
            dataIndex: 'readme',
            key: 'readme'
        },
        {
            title: '操作',
            key: 'operation',
            width:'15%',
            render:(record)=>{
                const linkProps={
                    pathname:'/service/company/info',
                    query:{eid:record.id},
                    state:{record}
                };
                return (<div className={styles['antd-operation-link']}>
                    <AuditModel record={record} onOk={editHandler.bind(null, record.id)} title="审核企业信息" isEdit={true}>
                        <a href="javascript:void(0)" className={styles['edit-text']}>审核</a>
                    </AuditModel>
                    <Link to={linkProps} className={styles['text-green']}>详细资料</Link>
                </div>)
            }
        },
    ];
    const pagination={
        total:list.count,
        showTotal:(total)=> `共 ${total} 家企业`,
        showSizeChanger:true,
        pageSize:size,
        onShowSizeChange:(current,pageSize)=>{
            dispatch(routerRedux.push({
                pathname: '/service/company',
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
    const { list,page,size,status} = state.companyAudit;
    return {
        loading:state.loading.models.companyAudit,
        list,
        page,
        size,
        status
    };
}
export default connect(mapStateToProps)(Company);
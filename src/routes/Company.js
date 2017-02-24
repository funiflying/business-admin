import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,message,Button} from 'antd';
import { routerRedux } from 'dva/router';
import SearchComponent from '../components/Company/Search';
import CompanyModel from '../components/Company/CompanyModel'
import styles from './Company.less'
function Company({dispatch,data,loading,page,size,status}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/company',
      query: { page,size },
    }));
  }
  function search(value) {
    dispatch(routerRedux.push({
      pathname: '/company',
      query: value ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'company/remove',
      payload: id ,
    });
  }
  function editHandler(id,values) {
    dispatch({
      type: 'company/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'company/create',
      payload: values ,
    });
  }
  if(status){
      message.success('操作成功')
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
      title: '操作',
      key: 'operation',
      render:(record)=>{
         return (<div className={styles['antd-operation-link']}>
           <span >授权</span>
           <span>组织机构</span>
           <CompanyModel record={record} onOk={editHandler.bind(null, record.id)} title="编辑企业信息">
             <a href="javascript:void(0)" className={styles['edit-text']}>编辑</a>
           </CompanyModel>
           <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
             <a href="javascript:void(0)">删除</a>
           </Popconfirm>
         </div>)
      }
    },
  ];
  const pagination={
    total:data.count,
    showTotal:(total)=> `共 ${total} 家企业`,
    showSizeChanger:true,
    pageSize:size,
    onShowSizeChange:(current,pageSize)=>{
      dispatch(routerRedux.push({
        pathname: '/company',
        query: { page:current,size:pageSize },
      }));
    },
    onChange:pageChangeHandler
  }
  return (
    <div>
      <SearchComponent search={search} createHandler={createHandler}/>
      <Table
        columns={columns}
        dataSource={data.data}
        rowKey={record => record.id}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
}
function mapStateToProps(state) {
  const { data,page,size,status} = state.company;
  return {
    loading: state.loading.models.company,
    data,
    page,
    size,
    status
  };
}
export default connect(mapStateToProps)(Company);


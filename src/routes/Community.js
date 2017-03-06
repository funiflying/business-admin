import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,message,Button} from 'antd';
import { routerRedux,Link } from 'dva/router';
import styles from './Company.less'
function Community({dispatch,data,loading,page,size,status}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/community',
      query: { page,size },
    }));
  }
  function search(value) {
    dispatch(routerRedux.push({
      pathname: '/community',
      query: value ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'community/remove',
      payload: id ,
    });
  }
  function editHandler(id,values) {
    dispatch({
      type: 'community/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'community/create',
      payload: values ,
    });
  }
  const columns = [
    {
       title:"编号",
       dataIndex:"code",
       key:"code"
    },
    {
      title: '社区名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      key: 'operation',
      width:'20%',
      render:(record)=>{
        const link={
          pathname:'/building',
          query:{id:record.id},
          state:{community:record}
        }
        const linkProps={
          pathname:'accredit/community',
          query:{communityId:record.id},
          state:{record}
        };
        return (<div className={styles['antd-operation-link']}>
          <Link to={linkProps} className={styles['text-green']}>授权</Link>
          <Link to={link} className={styles['text-green']}>查看楼宇</Link>
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
        pathname: '/community',
        query: { page:current,size:pageSize },
      }));
    },
    onChange:pageChangeHandler
  }
  return (
    <div>
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
  const { data,page,size,status} = state.community;
  return {
    loading: state.loading.models.community,
    data,
    page,
    size,
    status
  };
}
export default connect(mapStateToProps)(Community);


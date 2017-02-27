import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Table,Popconfirm,message,Button,Tag,Tree,Row,Col} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Company.less';
const TreeNode = Tree.TreeNode;

function App({dispatch,data,loading,page,size,status}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/building',
      query: { page,size },
    }));
  }
  function search(value) {
    dispatch(routerRedux.push({
      pathname: '/building',
      query: value ,
    }));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'building/remove',
      payload: id ,
    });
  }
  function editHandler(id,values) {
    dispatch({
      type: 'building/patch',
      payload: { id, ...values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'building/create',
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
      title: '楼宇名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'operation',
      width:'15%',
      render:(record)=>{
        const linkProps={
          pathname:'/application/conf',
          query:{id:record.id},
          state:{record}
        };
        return (<div className={styles['antd-operation-link']}>
          <Popconfirm title="确定删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </div>)
      }
    },
  ];
  const pagination={
    total:data.count,
    showTotal:(total)=> `共 ${total} 条记录`,
    showSizeChanger:true,
    pageSize:size,
    onShowSizeChange:(current,pageSize)=>{
      dispatch(routerRedux.push({
        pathname: '/application',
        query: { page:current,size:pageSize },
      }));
    },
    onChange:pageChangeHandler
  };
  return (
    <div>
      <Row>
        <Col span="6">
          <Tree className="myCls" showLine checkable>
            <TreeNode title="社区" key="0-0">
              <TreeNode title="楼宇1" key="0-0-0" />
              <TreeNode title="楼宇2" key="0-0-1"/>

            </TreeNode>
          </Tree>
        </Col>
        <Col span="18">
          <Table
            columns={columns}
            dataSource={data.data}
            rowKey={record => record.id}
            pagination={pagination}
            loading={loading}
          />
        </Col>
      </Row>


    </div>
  );
}
function mapStateToProps(state) {
  const { data,page,size,status} = state.building;
  return {
    loading: state.loading.models.building,
    data,
    page,
    size,
    status
  };
}
export default connect(mapStateToProps)(App);

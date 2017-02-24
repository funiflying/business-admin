import React from 'react';
import {connect} from 'dva';
import { Table, Pagination, Popconfirm ,Button} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import UserModal from './UserModel';
function  Users({dispatch,list:dataSource,total,page:current,loading}) {
  function deleteHandler(id) {
    dispatch({
      type:'users/remove',
      payload:id
    })
  }
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const pagination={
    total:10,
    current:current,
    pageSize:5,
    onChange:pageChangeHandler
  }
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">新增</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource.data}
          rowKey={record => record.id}
          pagination={pagination}
          loading={loading}
        />
      </div>
    </div>
  );
}
function  mapStateToProps(state) {
  const { list, total, page,current } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page
  };
}
export default connect(mapStateToProps)(Users);

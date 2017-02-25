import React from 'react';
import { connect } from 'dva';
import {message} from 'antd'
import CommunityComponent from '../components/Community/Community'

function Community({dispatch,status}) {
  function createHandler(values) {
    dispatch({
      type: 'community/create',
      payload: values ,
    });
  }
  if(status){
    message.success('操作成功')
  }
  return (
    <CommunityComponent onOk={createHandler} record={{}}/>
  );
}

function mapStateToProps(state) {
  const {status}=state.community;
  return {
    status
  };
}

export default connect(mapStateToProps)(Community);

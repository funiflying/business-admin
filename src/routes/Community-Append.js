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
  return (
    <CommunityComponent onOk={createHandler} record={{}}/>
  );
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Community);

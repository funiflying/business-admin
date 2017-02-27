import React from 'react';
import { connect } from 'dva';
import ConfComponent from '../components/Application/Conf'

function ApplicationAppend({dispatch,location,loading,data}) {
  function createHandler(values) {
    dispatch({
      type: 'application/patchConf',
      payload: values ,
    });
  }
  const record=Object.assign({},location.state.record,data.data);
  return (
    <div>
      <ConfComponent record={record} onOk={createHandler} loading={loading}/>
    </div>
  );
}
function mapStateToProps(state) {
  const {data}=state.application;
  return {
    loading:state.loading.models.application,
    data,
  };
}

export default connect(mapStateToProps)(ApplicationAppend);

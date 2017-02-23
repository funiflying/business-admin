import React from 'react';
import { connect } from 'dva';
import UsersComponent from '../components/Users/Users';
function Users({ location }) {
  return (
             <UsersComponent />
  );
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Users);

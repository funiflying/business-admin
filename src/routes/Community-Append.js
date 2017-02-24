import React from 'react';
import { connect } from 'dva';
import CommunityComponent from '../components/Community/Community'

function Community(props) {
  return (
    <CommunityComponent record={{}}/>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Community);

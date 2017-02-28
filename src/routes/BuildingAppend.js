import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,message,Button,Tag,Tree,Row,Col} from 'antd';
import TreeComponent from '../components/Building/Tree';
import BuildingComponent from '../components/Building/Building';

function BuildingAppend({dispatch,loading,community,location,id}) {
  let record={
    id:'',
    name:''
  };
  function onPageChange(pageNo) {
    dispatch({
      type:'building/fetchCommunity',
      payload:{pageNo,id}
    })
  }
  function onSearch(name) {
    dispatch({
      type:'building/fetchCommunity',
      payload:{name,id}
    })
  }
  const treeProps={
    defaultExpandAll:true,
    showLine:true,
    defaultSelectedKeys:[id],
    onSelect:(id,node)=>{
      record={
        id:id,
        name:node.selectedNodes[0].props.title
      };
    }
  }
  return (
    <div>
      <Row>
        <Col span="6">
          <TreeComponent treeProps={treeProps} treeData={community} onPageChange={onPageChange} onSearch={onSearch}/>
        </Col>
        <Col span="18">
          <BuildingComponent record={record}/>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  const {community,id} = state.building;
  return {
    loading: state.loading.models.building,
    community,
    id
  };
}

export default connect(mapStateToProps)(BuildingAppend);

import React from 'react';
import { Tree,Input,Pagination } from 'antd';
import _ from 'underscore'
const TreeNode = Tree.TreeNode;
class TreeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            expandedKeys:[],
            current:1
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            name:nextProps.name
        });
    }
    changHandler(event){
        this.setState({
            name:event.target.value
        });
    }
    render() {
        const {loadData,rootData, nodesData,selectHandler,draggable=false,eid,onPageChange,name,onSearch,onDrop,community}=this.props;
        const props={
            showLine:true,
            draggable:draggable,
            defaultSelectedKeys:[eid],
            defaultExpandedKeys:[eid],
            loadData:(node)=>{
                const {eventKey}=node.props;
                this.setState({
                    expandedKeys:[eventKey]
                });
                return new Promise((resolve) => {
                    setTimeout(() => {
                        loadData(node);
                        resolve();
                    }, 1000);
                });
            },
            onSelect:(key,node)=>{
                selectHandler(node)
            },
            onDrop:(node)=>{
                const {title,eventKey,nodeFlag,isOrgan,eid}=node.dragNode.props;
                const target=node.node.props.eventKey;
                const target_org=node.node.props.isOrgan;
                if(isOrgan&&target_org){
                    onDrop({
                        nodeName:title,
                        nodeFlag,
                        id:eventKey,
                        parentId:target,
                        eid
                    })
                }
            }

        };
        const pagination={
            total:rootData.count,
            pageSize:20,
            current:this.state.current,
            simple:true,
            onChange:(page)=>{
                this.setState({
                    current:page
                });
                onPageChange(page)
            }
        };
        const loop = (data=[]) => {
         return data.map((item) => {
             community&&community.data&&community.data.map((com)=>{
                 if(item.id===com.organizationId){
                     let evens=_.find(item.organizationList,function (num) {
                         return num.id==com.id
                     });
                     if(!evens){
                         item.organizationList.push({
                             nodeName:com.name,
                             id:com.id,
                             isCommunity:true
                         });
                     }
                 }
             });
             if (item.organizationList&&item.organizationList.length>0) {
                return (<TreeNode title={item.nodeName||item.name}  key={item.id} isOrgan={true}  nodeFlag={item.nodeFlag} eid={item.eid} isCommunity={item.isCommunity}>{loop(item.organizationList)}</TreeNode>);
              }
             return <TreeNode title={item.nodeName} key={item.id} isLeaf={true}  nodeFlag={item.nodeFlag}  isOrgan={true} eid={item.eid} isCommunity={item.isCommunity}/>
            });
        };
        const treeNodes = loop(nodesData.organizationList);
        return (
            <div>
                <div style={{width:'60%'}}>
                    <Input.Search placeholder="企业名称" onSearch={onSearch} onChange={this.changHandler.bind(this)} value={this.state.name} />
                </div>
                <Tree {...props} >
                    {
                        rootData.data&&rootData.data.map((item)=>{
                            if(item.id===nodesData.eid){
                                return (<TreeNode title={item.company} key={item.id} isCompany={true} >
                                    <TreeNode title={nodesData.nodeName} key={nodesData.id} eid={nodesData.eid} isOrgan={true}  nodeFlag={nodesData.nodeFlag} >
                                        {treeNodes}
                                    </TreeNode>
                                </TreeNode>)
                            }else {
                                return (<TreeNode title={item.company} key={item.id} isOrgan={false} />)
                            }

                        })
                    }
                </Tree>
                <div style={{margin:'10px auto'}}>
                    <Pagination size="small" {...pagination}/>
                </div>
            </div>
        );
    }
}
export default TreeComponent;
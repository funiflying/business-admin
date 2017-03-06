import React, { Component } from 'react';
import { Modal,Upload, Icon, message,Button,Spin } from 'antd';
import {getToken} from '../../utils/index'
class CompanyModel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading:false
    };
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { children,onOk } = this.props;
    const { id,company} = this.props.record;
    const that=this;
    const props = {
      name: 'file',
      action: `/api/enterprise/cloud/uploadExcel?eid=${id}`,
      headers: {
          token:getToken(),
          deviceTag:3
      },
      beforeUpload:(file) =>{
        var name=file.name;
        const isXlS = name.substr(name.lastIndexOf('.')+1).toLowerCase()==="xls";
        if (!isXlS) {
          message.error('请上传xls类型的文件');
        }
        return isXlS
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          //console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          onOk();
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
          that.setState({
            visible:true,
            loading:true
          });
        }
      },
    };
    return (

        <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="数据导入"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          maskClosable={false}
        >
          <Spin spinning={this.state.loading} tip="正在导入数据，请不要关闭">
              <h2>企业名称：{company}</h2>
              <br/>
             <Upload
               className="avatar-uploader"
               name="avatar"
               {...props}
             >
               <Button>
                  <Icon type="upload" /> 导入文件
              </Button>
            </Upload>
            </Spin>
        </Modal>
      </span>


    );
  }
}

export default CompanyModel;

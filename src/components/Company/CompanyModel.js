import React, { Component } from 'react';
import { Modal, Form, Input,Cascader } from 'antd';
const FormItem = Form.Item;
import region from '../../utils/region.min';

class CompanyModel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  okHandler = () => {
    const { onOk } = this.props;
    const {resetFields}=this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(Object.assign(values,{cityId:values.cityId[values.cityId.length-1]}));
        this.hideModelHandler();
        resetFields()
      }
    });
  };

  render() {
    const { children,title } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { company, boss,email, address,phone,fax,contract,contractPhone,readme,cityId } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const regionProps={
      options:region,
      showSearch:true,
      allowClear:false
    }
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          maskClosable={false}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="企业名称"
            >
              {
                getFieldDecorator('company', {
                  initialValue: company,
                  rules: [
                    {
                      required: true,
                      message: '请填写企业名称'
                    }
                  ]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="企业负责人"
            >
              {
                getFieldDecorator('boss', {
                  initialValue: boss,
                  rules: [
                    {
                      required: true,
                      message: '请填写企业名称'
                    }
                  ]
                })(<Input />)
              }
            </FormItem>
            {/* <FormItem
               {...formItemLayout}
               label="城市"
             >
               {
                 getFieldDecorator('cityId', {
                   initialValue: cityId,
                   rules: [
                     {
                       required: true,
                       message: '请选择城市'
                     }
                   ]
                 })(<Cascader {...regionProps} placeholder=""/>)
               }
               </FormItem>*/}
            <FormItem
              {...formItemLayout}
              label="企业地址"
            >
              {
                getFieldDecorator('address', {
                  initialValue: address,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="公司电话"
            >
              {
                getFieldDecorator('phone', {
                  initialValue: phone,
                })(<Input type="tel"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="公司传真"
            >
              {
                getFieldDecorator('fax', {
                  initialValue: fax,
                })(<Input type="tel"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电子邮箱"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input type="email"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人"
            >
              {
                getFieldDecorator('contract', {
                  initialValue: contract,
                  rules: [
                    {
                      required: true,
                      message: '请填写联系人'
                    }
                  ]
                })(<Input type="tel"/>)
              }
            </FormItem>
             <FormItem
               {...formItemLayout}
               label="联系人电话"
             >
              {
                getFieldDecorator('contractPhone', {
                  initialValue: contractPhone,
                  rules: [
                    {
                      required: true,
                      message: '请填写联系人电话'
                    }
                  ]
                })(<Input />)
              }
            </FormItem>
             <FormItem
               {...formItemLayout}
               label="备注"
             >
              {
                getFieldDecorator('readme', {
                  initialValue: readme,
                })(<Input type="textarea" rows={4}/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CompanyModel);

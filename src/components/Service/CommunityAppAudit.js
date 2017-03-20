import React, { Component } from 'react';
import { Modal, Form, Input,Radio,Select,InputNumber  } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
                onOk(values);
                this.hideModelHandler();
                resetFields()
            }
        });
    };
    render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { eid,company, status=1,reply,thirdName,thirdId,deviceCount,deviceType=''} = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        return (
            <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
            title="企业应用审核"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
            maskClosable={false}
            width="600px"
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
                {...formItemLayout}
                label="企业名称"
            >
              {
                  getFieldDecorator('eid', {
                      initialValue: eid
                  })(<span className="ant-form-text">{company}</span>)
              }
            </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="设备名称"
              >
              {
                  getFieldDecorator('id', {
                      initialValue: thirdId
                  })(<span className="ant-form-text">{thirdName}</span>)
              }
            </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="设备数量"
              >
              {
                  getFieldDecorator('deviceCount', {
                      initialValue: deviceCount,
                      rules: [
                          {
                              required: true,
                              message: '请填写设备数量'
                          }
                      ]
                  })(<InputNumber/>)
              }
            </FormItem>
               <FormItem
                   {...formItemLayout}
                   label="设备类型"
               >
              {
                  getFieldDecorator('deviceType', {
                      initialValue: deviceType.toString(),
                      rules: [
                          {
                              required: true,
                              message: '请选择设备类型'
                          }
                      ]
                  })(
                      <Select>
                          <Select.Option value="1">业主端-物业 </Select.Option>
                          <Select.Option value="2">业主端-生活</Select.Option>
                          <Select.Option value="11">物业端-服务</Select.Option>
                          <Select.Option value="12">物业端-工作</Select.Option>
                          <Select.Option value="0">其他</Select.Option>
                      </Select>
                  )
              }
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="审核结果"
            >
              {
                  getFieldDecorator('status', {
                      initialValue: status,
                      rules: [
                          {
                              required: true,
                              message: '请填写审核结果'
                          }
                      ]
                  })(
                      <RadioGroup>
                          <Radio value={1}>通过</Radio>
                          <Radio value={0}>不通过</Radio>
                      </RadioGroup>
                  )
              }
            </FormItem>
             <FormItem
                 {...formItemLayout}
                 label="审核意见"
             >
              {
                  getFieldDecorator('reply', {
                      initialValue: reply,
                      rules: [
                          {
                              required: true,
                              message: '请填写审核审核意见'
                          }
                      ]
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

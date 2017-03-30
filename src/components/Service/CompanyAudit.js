import React, { Component } from 'react';
import { Modal, Form, Input,Radio  } from 'antd';
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
        const { id,company, status=1,reply} = this.props.record;
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
            title="企业审核"
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
                      initialValue: id
                  })(<span className="ant-form-text">{company}</span>)
              }
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="审核结果"
            >
              {
                  getFieldDecorator('status', {
                      initialValue: "3",
                      rules: [
                          {
                              required: true,
                              message: '请填写审核结果'
                          }
                      ]
                  })(
                      <RadioGroup>
                          <Radio value="3">通过</Radio>
                          <Radio value="-1">不通过</Radio>
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

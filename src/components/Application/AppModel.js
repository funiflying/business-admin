import React, { Component } from 'react';
import { Modal, Form, Input,Switch } from 'antd';

const FormItem = Form.Item;

class AppModel extends Component {

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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(Object.assign({},values,{status:Number(values.status)}));
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children,title } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { third_name, status } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
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
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="应用名称"
            >
              {
                getFieldDecorator('thirdName', {
                  initialValue: third_name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="应用状态"
            >
              {
                getFieldDecorator('status', {
                  initialValue: Boolean(status),
                  valuePropName: 'checked'
                })(<Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AppModel);

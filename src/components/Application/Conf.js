import React,{Component} from 'react';
import {Button,Form,Input,Select,Switch,Spin} from 'antd';
const FormItem=Form.Item;


class Conf extends Component{
  constructor(props){
    super(props)
  }
  okHandler(){
    const {onOk}=this.props;
    const {id} = this.props.record;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let notifyCallbackUrl=values.notifyCallbackUrl;
        if(notifyCallbackUrl&&(notifyCallbackUrl.indexOf("https://")!=0||notifyCallbackUrl.indexOf("http://")!=0)){
          notifyCallbackUrl=values.protocol+notifyCallbackUrl;
        }
        onOk(Object.assign({},values,{id},{notifyCallbackUrl:notifyCallbackUrl},{protocol:null}));
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {okHandler,loading} =this.props;
    const { third_name,status,host,appId,appKey,token,notifyCallbackUrl} = this.props.record;
    let protocol="http://";
    if(notifyCallbackUrl&&notifyCallbackUrl.indexOf("https://")==0){
      protocol="https://";
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span:8 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 6,
      },
    };
    const selectBefore =
      getFieldDecorator('protocol', {
        initialValue: protocol,
        rules: [
          {
            required: true,
            message: '请选择http协议'
          }
        ]
      })(
      <Select style={{ width: 80 }}>
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    );
    return (
      <div>
        <Spin spinning={loading}>
        <Form horizontal onSubmit={this.okHandler.bind(this)}>
          <FormItem
            {...formItemLayout}
            label="应用名称"
          >
            <span className="ant-form-text">{third_name}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="应用状态"
          >
          <Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} disabled defaultValue={Boolean(status)}/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="主机地址"
          >
            {
              getFieldDecorator('host', {
                initialValue: host,
                rules: [
                  {
                    required: true,
                    message: '请填写主机地址'
                  }
                ],
              })(<Input/>)
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="APP-ID"
          >
            {
              getFieldDecorator('appId', {
                initialValue: appId,
                rules: [
                  {
                    required: true,
                    message: '请填写APP-ID'
                  }
                ],
              })(<Input/>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密钥"
          >
            {
              getFieldDecorator('appKey', {
                initialValue: appKey,
                rules: [
                  {
                    required: true,
                    message: '请填写密钥'
                  }
                ],
              })(<Input/>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证token"
          >
            {
              getFieldDecorator('token', {
                initialValue: token,
                rules: [
                  {
                    required: true,
                    message: '请填写验证token'
                  }
                ],
              })(<Input/>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="回调地址"
          >
            {
              getFieldDecorator('notifyCallbackUrl', {
                initialValue: notifyCallbackUrl,
                rules: [
                  {
                    required: true,
                    message: '请填写回调地址'
                  }
                ],
              })(<Input  addonBefore={selectBefore} />)
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">提交</Button>
          </FormItem>
        </Form>
        </Spin>
      </div>
    );
  }
}
export default Form.create()(Conf);

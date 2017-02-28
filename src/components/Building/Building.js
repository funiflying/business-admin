import React,{Component} from 'react';
import {Form,Button,Input} from 'antd';
const FormItem=Form.Item;
class Building extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {getFieldDecorator}=this.props.form;
    const {record}=this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 6,
      },
    };
    return (
      <div>
          <Form >
            <FormItem {...formItemLayout} label='社区名称'>
              {getFieldDecorator(`id`,{
                 initialValue:'id'
              })(
                <span className="ant-form-text">{record.name}</span>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='楼宇名称'>
              {getFieldDecorator(`name`)(
                <Input />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout} >
              <Button type="primary" htmlType="submit" size="large">提交</Button>
            </FormItem>
          </Form>
      </div>
    );
  }

}

export default Form.create()(Building);

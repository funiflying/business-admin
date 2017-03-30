import React,{ Component } from 'react';
import {Button,Form,Input,Row,Col,Select} from 'antd';
const SearchInput = Input.Search;
import styles from '../../components/Search.css';
const FormItem=Form.Item;
const Option=Select.Option;
class Search extends Component  {
  constructor(props) {
    super(props);
  }
  handleSubmit(){
    const { search } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        search(values)
      }
    });

  }
  render(){
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    };
    const {createHandler}=this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span="16">

        </Col>
        <Col span="8" className={styles['ant-advanced-search-form']}>
          <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('status', {

              })(
                <Select style={{ width: 150 }} placeholder="审核状态" allowClear={true}>
                  <Option value="0">待审核</Option>
                  <Option value="1">已启用</Option>
                  <Option value="2">已禁用</Option>
                  <Option value="-1">已驳回</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
              })(
                <Input placeholder="应用名称"/>
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索
              </Button>
            </FormItem>
          </Form>

        </Col>
      </Row>
    );
  }
}

export default Form.create()(Search);

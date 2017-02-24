import React,{Component} from 'react';
import { Modal, Form, Input,Cascader,Row,Col  } from 'antd';
import MapComponent from '../../components/Map/Map'
import region from '../../utils/region.min'
const FormItem = Form.Item;

import styles from './Community.css';

class Community extends Component{
  constructor(props){
    super(props);
    this.state={
      city:null
    }
  }
  onSelect(point){
      console.log(point)
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { name,address,organizationId,city} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span:6 },
    };
    const mapProps={
      city:'厦门',
      lon:'118',
      lat:'38',
      style:{
        height:'500px'
      }
    }
    const regionProps={
      options:region,
      showSearch:true,
      allowClear:false
   }
    return (
      <div>
        <Form horizontal onSubmit={this.okHandler}>
          <FormItem
            {...formItemLayout}
            label="社区名称"
          >
            {
              getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: '请填写社区名称'
                  }
                ]
              })(<Input />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="城市"
          >
            {
              getFieldDecorator('address', {
                initialValue: city,
                rules: [
                  {
                    required: true,
                    message: '请选择城市'
                  }
                ],
                onChange:(value,record)=>{
                  let city='';
                  record.map((item)=>{
                      city+=item.label
                  });
                  this.setState({
                    city:city
                  })
                }
              })(<Cascader {...regionProps} placeholder=""/>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="详细地址"
          >
            {
              getFieldDecorator('address', {
                initialValue: address,
                rules: [
                  {
                    required: true,
                    message: '请填写企业名称'
                  }
                ]
              })(<Input />)
            }
          </FormItem>
        </Form>
        <Row>
          <Col span="4"/>
          <Col span="18">
            <MapComponent {...mapProps} city={this.state.city}/>
          </Col>
        </Row>

      </div>
    )
  }
}

export default Form.create()(Community);

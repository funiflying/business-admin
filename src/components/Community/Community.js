import React,{Component} from 'react';
import { Modal, Form, Input,Cascader,Row,Col,message,Button  } from 'antd';
import MapComponent from '../../components/Map/Map';
const FormItem = Form.Item;
const Search = Input.Search;


class Community extends Component{
  constructor(props){
    super(props);
    this.state={
      city:null,
      lng:null,
      lat:null
    }
  }
  onSelect(point){
    this.setState({
      lng:point.lng,
      lat:point.lat
    })
  }
  onSearch(value){
     this.setState({
        address:value
      });
  }
  okHandler(){
    const { onOk } = this.props;
    const {resetFields}=this.props.form;
    this.props.form.validateFields((err, values) => {
      const {lng,lat}=this.state;
      if (!err) {
        onOk(Object.assign({},values,{gpsLongitude:lng,gpsLatitude:lat}));
        resetFields()
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { name,address,organizationId} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span:12 },
    };
    const mapProps={
      city:null,
      lng:null,
      lat:null,
      onSelect:this.onSelect.bind(this),
      onMessage:(err)=>{
         message.info(err)
      },
      style:{
        height:"420px",
        width:"580px"
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 8,
      },
    };
    return (
      <div>
        <Row>
          <Col span="9">
            <Form>
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
                label="详细地址"
              >
                {
                  getFieldDecorator('address', {
                    initialValue: address,
                    rules: [
                      {
                        required: true,
                        message: '请填写详细地址'
                      }
                    ],
                  })(<Search
                    placeholder=""
                    onSearch={this.onSearch.bind(this)}
                  />)
                }
              </FormItem>
              <FormItem {...tailFormItemLayout} >
                <Button type="primary" onClick={this.okHandler.bind(this)} size="large">提交</Button>
              </FormItem>
            </Form>
          </Col>
          <Col span="6">
            <MapComponent {...mapProps} city={this.state.city} address={this.state.address}/>
          </Col>
        </Row>

      </div>
    )
  }
}
export default Form.create()(Community);

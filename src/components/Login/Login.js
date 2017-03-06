import React, { Component } from 'react';
import {
  Icon,message,Button, Row,Col,Form,Input,Select
} from 'antd';
import sha1 from 'sha1';
import md5 from 'md5'
import {signature} from '../../utils/index'
import config from '../../utils/config'
import styles from './login.less';
const FormItem = Form.Item;

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleOk(e){
     e.preventDefault();
     this.props.form.validateFields((err, values) => {
       if (!err) {
         //md5(sha1(values.pwd))
         const timestamp=new Date().getTime();
         const nonce=Math.random().toString(36);
         const appId="f94b1d87d0d94d698db7ddbfad25571a";
         const sign=signature(appId,timestamp,nonce);
         this.props.onLogin(Object.assign({},values,{appId,signature:sign,timestamp,nonce}))
       }
     });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.status){
        nextProps.loginSuccess()
    }else if(nextProps.data.status==0){
        nextProps.loginFailed();
        message.info(nextProps.data.message)
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return(
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src={config.logoSrc}/>
          <span>智慧社区</span>
        </div>
        <form onSubmit={this.handleOk.bind(this)}>
          <FormItem hasFeedback>
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input size="large" placeholder="用户名"/>)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '请填写密码'
                }
              ]
            })(<Input size="large" type="password" placeholder="密码"/>)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Row>
        </form>
      </div>
    )
  }
}


export default Form.create()(LoginComponent);

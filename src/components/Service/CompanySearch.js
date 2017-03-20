import React,{ Component } from 'react';
import {Button,Form,Input,Row,Col} from 'antd';
const SearchInput = Input.Search;
import styles from '../../components/Search.css';
class Search extends Component  {
    constructor(props) {
        super(props);
    }
    handleSubmit(value){
        const { search } = this.props;
        search({name:value})
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
                    <SearchInput
                        placeholder="企业名称"
                        style={{ width: 200,float:'right' }}
                        onSearch={this.handleSubmit.bind(this)}
                    />
                </Col>
            </Row>
        );
    }
}

export default Form.create()(Search);

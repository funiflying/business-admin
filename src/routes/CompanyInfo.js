import React from 'react';
import { connect } from 'dva';
import {Card,Col, Row,Form} from 'antd';
import Lightbox from '../components/Lightbox/Lightbox';
const FormItem = Form.Item;
function CompanyInfo({loading,location}) {
  const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
  };
    const { logoUrl,company,boss,address,phone,fax,email,contract,contractPhone,readme,enterpriseImages=[
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489739112216&di=e223ff443073ced373f17e0328e713c2&imgtype=0&src=http%3A%2F%2Fhomemade.keliren.cn%2Ftuku%2Fa%2F20160406%2F570461f141575.jpg",
            title:""
        },
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489740818191&di=52e81ad1e5ba156d6408f7bce0ac37fa&imgtype=0&src=http%3A%2F%2Fwww.czx318.com%2Fupfile%2F1436246203630891155.jpg",
            title:""
        },
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489740818189&di=a97a95b0d6c06202e1f1b8c724c7ba68&imgtype=0&src=http%3A%2F%2Fh7.86.cc%2Fwalls%2F20150818%2F1440x900_b20c4d0db05c9c5.jpg",
            title:""
        },
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489740870401&di=7ebc5ddd3bd6827cef3e5bcd20904681&imgtype=0&src=http%3A%2F%2Fimages.tuniu.com%2Fimages%2F2013-08-06%2Fl%2Fl6V442mmQEssgKK3.jpg",
            title:""
        },
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489740897921&di=1be15d00225bf2d3877d848098165ae2&imgtype=0&src=http%3A%2F%2Fpic.feiyang.cn%2Fline_photo%2F2013-10%2F8547f4a1ecff4c5b96349fc3a5adae23.jpeg",
            title:""
        },
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489740897918&di=0648efecd05a9d5c9d19b960f6c3fb92&imgtype=0&src=http%3A%2F%2Fupload.17u.net%2Fuploadpicbase%2Fimage%2F201609130101128223.jpg",
            title:""
        },
        {
            url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489740897911&di=8167c05e284330e25039484007c961a4&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1409%2F25%2Fc3%2F38964443_1411611709597_mthumb.jpg",
            title:""
        }

    ] } = location.state.record;
  return (
    <div >
        <Row gutter={16}>
            <Col span="8">
                <Card title="基本信息" loading={loading}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="企业头像"
                        >
                            <span className="ant-form-text">{company}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="企业名称"
                        >
                            <span className="ant-form-text">{company}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="法人代表"
                        >
                            <span className="ant-form-text">{boss}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="地址"
                        >
                            <span className="ant-form-text">{address}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                        >
                            <span className="ant-form-text">{readme}</span>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
            <Col span="8">
                <Card title="联系方式"  loading={loading}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="公司电话"
                        >
                            <span className="ant-form-text">{phone}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="公司传真"
                        >
                            <span className="ant-form-text">{fax}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电子邮箱"
                        >
                            <span className="ant-form-text">{email}</span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="公司联系人"
                        >
                            <span className="ant-form-text">{contract}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系人电话"
                        >
                            <span className="ant-form-text">{contractPhone}</span>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
            <Col span="8">
                <Card title="证照图片"  loading={loading}>
                    <Lightbox images={enterpriseImages}/>
                </Card>
            </Col>
        </Row>
    </div>
  );
}
function mapStateToProps(state) {
  return {
      loading:state.loading.models.companyAudit
  };
}

export default connect(mapStateToProps)(CompanyInfo);

import React from 'react';
import {Menu,Button,Icon,Switch} from 'antd'
import {Link} from 'dva/router'
import styles from './main.less';
import config  from '../../utils/config'
const SubMenu = Menu.SubMenu;
function Sider({location,darkTheme,changeTheme}) {
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        <span>{config.logoText}</span>
      </div>
      <Menu
        mode="inline"
        theme={darkTheme}
      >
        <Menu.Item key="1"><Link to="home"><Icon type="home" />我的首页</Link></Menu.Item>
          <SubMenu key="sub0" title={<span><Icon type="customer-service" /><span>客服中心</span></span>}>
              <Menu.Item key="sub0-1"><Link to="service/company">企业注册</Link></Menu.Item>
              <Menu.Item key="sub0-2"><Link to="service/company/app">企业应用</Link></Menu.Item>
              <Menu.Item key="sub0-3"><Link to="service/community/app">社区应用</Link></Menu.Item>
          </SubMenu>
        <Menu.Item key="sub1"><Link to="company"><Icon type="laptop"/>企业管理</Link></Menu.Item>
        <Menu.Item key="sub2"><Link to="organization"><Icon type="windows-o"/>组织机构</Link></Menu.Item>
        <Menu.Item key="sub3"><Link to="community"><Icon type="pie-chart" />社区管理</Link></Menu.Item>
        <Menu.Item key="sub4"><Link to="building"><Icon type="shop"/>楼宇管理</Link></Menu.Item>
        <Menu.Item key="sub5"><Link to="application"><Icon type="appstore-o"/>应用管理</Link></Menu.Item>
        <SubMenu key="sub8" title={<span><Icon type="share-alt" /><span>权限角色</span></span>}>
          <Menu.Item key="sub8-0"><Link to="authorize">权限管理</Link></Menu.Item>
          <Menu.Item key="sub8-1"><Link to="role">角色管理</Link></Menu.Item>
        </SubMenu>
       {/* <SubMenu key="sub6" title={<span><Icon type="appstore" /><span>用户</span></span>}>
          <Menu.Item key="sub6-0"><Link to="users">用户管理</Link></Menu.Item>
        </SubMenu>*/}
      </Menu>
      <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch checkedChildren="黑" unCheckedChildren="白" onChange={changeTheme} defaultChecked={darkTheme}/>
      </div>
    </div>
  );
}
export default Sider;

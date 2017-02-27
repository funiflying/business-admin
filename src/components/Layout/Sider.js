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
        <SubMenu key="sub0" title={<span><Icon type="home" /><span>首页</span></span>}>
          <Menu.Item key="1"><Link to="home">我的首页</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="sub1-1"><Link to="company"><Icon type="laptop"/>企业</Link></Menu.Item>
        <SubMenu key="sub3" title={<span><Icon type="pie-chart" /><span>社区</span></span>}>
          <Menu.Item key="sub3-0"><Link to="community">社区管理</Link></Menu.Item>
          <Menu.Item key="sub3-1"><Link to="community/append">新增社区</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="cloud-o" /><span>楼宇</span></span>}>
          <Menu.Item key="sub4-0"><Link to="building">楼宇管理</Link></Menu.Item>
          <Menu.Item key="sub4-1"><Link to="building/append">新增楼宇</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title={<span><Icon type="appstore-o" /><span>应用</span></span>}>
          <Menu.Item key="sub5-0"><Link to="application">应用管理</Link></Menu.Item>
          <Menu.Item key="sub5-1"><Link to="application/append">应用接入</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub6" title={<span><Icon type="appstore" /><span>用户</span></span>}>
          <Menu.Item key="sub6-0"><Link to="users">用户管理</Link></Menu.Item>
        </SubMenu>
      </Menu>
      <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch checkedChildren="黑" unCheckedChildren="白" onChange={changeTheme} defaultChecked={darkTheme}/>
      </div>
    </div>
  );
}
export default Sider;

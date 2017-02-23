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
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>用户管理</span></span>}>
          <Menu.Item key="5"><Link to="users">用户管理</Link></Menu.Item>
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

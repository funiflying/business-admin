import React from 'react';
import { Menu,Icon,Button } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less'
const SubMenu = Menu.SubMenu;

function Header({ location,switchSider,siderFold,user,logout }) {
  return (
      <div className={styles.header}>
          <Menu className="header-menu" mode="horizontal" >
              <SubMenu style={{ float: 'right' }}
                       title={<span><Icon type="user" />{user}</span>}
              >
                  <Menu.Item key="logout">
                      <a href="javascript:void(0)" onClick={logout}>注销</a>
                  </Menu.Item>
              </SubMenu>
          </Menu>
      </div>
  );
}

export default Header;

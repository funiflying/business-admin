import React from 'react';
import { Link } from 'react-router';
import styles from './main.less';
import {Breadcrumb} from 'antd'
function Bread({routes}) {
    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last||route.path=="" ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }
    return (
        <Breadcrumb className={styles.bread}  routes={routes} itemRender={itemRender}/>
  );
}

export default Bread;

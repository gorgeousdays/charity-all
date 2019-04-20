import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import styles from './style.module.scss'
import logo from './charity.png'
import { Dropdown, Menu } from 'antd';
import { inject, observer } from 'mobx-react';

const Header = inject('userStore', 'uiStore')(observer((props) => {
    const isShow = props.uiStore.headerShow
    const {currentUser} = props.userStore
    return (
      <div className={styles['header-wrap']}>
      <div className={styles['header']} style={{ visibility: isShow ? 'visible' : 'hidden' }}>
        <div className={styles['top-user-info']}>
          {!currentUser ? 
          <div className={styles['tourist-div']}>
            <Link to="/login" className={styles['link']}>登陆</Link>
            <Link to="/sign" className={styles['link']}>注册</Link>
          </div>
          :
          <div className={styles['user-div']}>
            <Dropdown placement="bottomCenter" overlay={
              <Menu>
                <Menu.Item><Link to="/user">我的信息</Link></Menu.Item>
                <Menu.Item><Link to="/user/project/favor">关注项目</Link></Menu.Item>
                <Menu.Item><Link to="/user/record/donation">捐款信息</Link></Menu.Item>
                <Menu.Item><Link to="/user/userinfo">修改信息</Link></Menu.Item>
                <Menu.Item><Link to="/user/feedback">反馈建议</Link></Menu.Item>
              </Menu>
            }>
              <img className={styles['avatar']} src={currentUser.avatar} alt="avatar" />
            </Dropdown>
          </div>}
        </div>
        <div className={styles['header-wrap']}>
          <div className={styles['logo']}>
            <img src={logo} alt='慈善' />
          </div>
          <div className={styles['top-navbar']} >
            <NavLink to="/" className={styles['navbar-item']} key='1'>首页</NavLink>
            <NavLink to="/explore" className={styles['navbar-item']} key='2'>发现项目</NavLink>
            <NavLink to="/resort" className={styles['navbar-item']} key='3'>求助</NavLink>
            <NavLink to="/aboutus" className={styles['navbar-item']} key='4'>关于我们</NavLink>
            <NavLink to="/user" className={styles['navbar-item']} key='5'>在线咨询</NavLink>
          </div>
        </div>
      </div>
      </div>
    )
  }
))

export default Header
 
import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

import styles from "./style.module.scss";
import logo from "./charity.png";
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Input } from "antd";
import { inject, observer } from "mobx-react";

const { Search } = Input;

const Header = withRouter(
  inject("userStore", "uiStore", "commonStore")(
    observer(({userStore, uiStore, commonStore, history}) => {
      const isShow = uiStore.headerShow;
      const logined = commonStore.logined;
      const { currentUser, pulling, pulled } = userStore;

      const handleSearch = value => {
        history.push(`/search?search=${value}`);
      };

      const handleLogout = () => {
        commonStore.removeToken()
        history.push('/')
      }

      return (
        <div className={styles["header-wrap"]}>
          <div
            className={styles["header"]}
            style={{ visibility: isShow ? "visible" : "hidden" }}
          >
            <div className={styles["top-user-info"]}>
              {!logined ? (
                <div className={styles["tourist-div"]}>
                  <Link to="/login" className={styles["link"]}>
                    登陆
                  </Link>
                  <Link to="/sign" className={styles["link"]}>
                    注册
                  </Link>
                </div>
              ) : (
                <div className={styles["user-div"]}>
                  <Dropdown
                    placement="bottomCenter"
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <Link to="/user">我的信息</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to="/user/project/favor">关注项目</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to="/user/record/donation">捐款信息</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to="/user/userinfo">修改信息</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to="/user/feedback">反馈建议</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <span onClick={handleLogout}>登出</span>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    {pulling && pulled ? (
                      <Avatar className={styles["avatar"]} icon={<UserOutlined />} />
                    ) : (
                      <img
                        className={styles["avatar"]}
                        src={currentUser.avatar? currentUser.avatar : logo}
                        alt="avatar"
                      />
                    )}
                  </Dropdown>
                </div>
              )}
            </div>
            <div className={styles["nav-wrap"]}>
              <div className={styles["logo"]}>
                <img src={logo} alt="慈善" />
              </div>
              <div className={styles["top-navbar"]}>
                <NavLink to="/" className={styles["navbar-item"]} key="1">
                  首页
                </NavLink>
                <NavLink
                  to="/explore"
                  className={styles["navbar-item"]}
                  key="2"
                >
                  发现项目
                </NavLink>
                <NavLink
                  to="/addProject"
                  className={styles["navbar-item"]}
                  key="4"
                >
                  发布项目
                </NavLink>
              </div>
              <div className={styles["search-wrap"]}>
                <Search className={styles["search"]} onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      );
    })
  )
);

export default Header;

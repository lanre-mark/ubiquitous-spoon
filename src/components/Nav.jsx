import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = {
  clearUser: actions.clearUser,
};

const Nav = (props) => {
  const logout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          props.clearUser();
        } else {
          console.log('logout is returning a request but does not have 200 code');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          {props.username && (
            <Menu.Item key="2">
              <Link to="/profile">My Profile</Link>
            </Menu.Item>
          )}
          {props.username && (
            <Menu.Item key="3">
              <Link to="/favorites">Saved Recipes</Link>
            </Menu.Item>
          )}
          {!props.username && (
            <Menu.Item style={{ float: 'right' }} key="5">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
          {!props.username && (
            <Menu.Item style={{ float: 'right' }} key="4">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          )}

          {props.username && (
            <Menu.Item style={{ float: 'right' }} key="6" onClick={logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

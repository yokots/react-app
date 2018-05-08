import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { HttpClient } from '../http';
import { UserService } from '../user.service';

import styles from './login.css';

HttpClient
  .get('http://localhost:8080/mock.json')
  .then(data => console.log(data))
  .catch(error => console.log(error));

export const LoginComponent: SFC<RouteComponentProps<void>> = (props) => {
  const { history } = props;
  const login = () => {
    UserService.isLogin = true;
    history.replace('/');
  };

  return (
    <div className={styles.container}>
      <button onClick={login}>login</button>
    </div>
  );
};

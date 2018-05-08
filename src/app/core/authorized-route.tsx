import React, { ReactNode, SFC } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import { UserService } from './user.service';

type RouteComponent = RouteProps['component'];
type RouteRender = RouteProps['render'];

function renderFactory(Component: RouteComponent): RouteRender {
  return (props: RouteComponentProps<any>): ReactNode => {
    if (!UserService.isLogin || !Component) {
      return <Redirect to="login" />;
    }

    return <Component {...props} />;
  };
}

export const AuthorizedRoute: SFC<RouteProps>
  = ({ component, ...rest }) => (<Route {...rest} render={renderFactory(component)} />);

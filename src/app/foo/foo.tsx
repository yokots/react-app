import React from 'react';
import Loadable from 'react-loadable'; // tslint:disable-line

export const FooComponent = Loadable({
  loader: () => import(/* webpackChunkName: "foo" */ './foo.async'),
  loading: () => <div>loading...</div>,
});

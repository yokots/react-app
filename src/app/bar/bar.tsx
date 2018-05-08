import React from 'react';
import Loadable from 'react-loadable'; // tslint:disable-line

export const BarComponent = Loadable({
  loader: () => import(/* webpackChunkName: "bar" */ './bar.async'),
  loading: () => <div>loading...</div>,
});

import React, { SFC, Fragment } from 'react';
import {
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { FooComponent } from '../foo/foo';
import { BarComponent } from '../bar/bar';

export const HomeComponent: SFC = () => (
  <Fragment>
    <ul>
      <li><Link to="/foo">Foo</Link></li>
      <li><Link to="/bar">Bar</Link></li>
    </ul>
    <div>
      <Switch>
        <Route path="/foo" component={FooComponent} />
        <Route path="/bar" component={BarComponent} />
        <Redirect from="/" to="/foo" />
      </Switch>
    </div>
  </Fragment>
);

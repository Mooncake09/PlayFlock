import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout';
import CreateEditForm from './components/CreateEditForm';
import Attack from './components/Attack';

import './custom.css'
import { UnitList } from './components/UnitList';

export default class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Redirect exact from='/' to='/list' />
          <Route path='/list' component={UnitList} />
          <Route path='/create' component={CreateEditForm} />
          <Route path='/edit' component={CreateEditForm} />
          <Route path='/attack' component={Attack} />
        </Switch>
      </Layout>
    );
  }
}

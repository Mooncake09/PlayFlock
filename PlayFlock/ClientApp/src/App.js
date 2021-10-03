import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CreateForm } from './components/CreateForm';

import './custom.css'
import { UnitList } from './components/UnitList';

export default class App extends Component {

  render () {
    return (
      <Layout>
        <Route exact path='/' component={UnitList} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/list' component={UnitList} />
        <Route path='/create' component={CreateForm} />
      </Layout>
    );
  }
}

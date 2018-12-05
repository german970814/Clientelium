import React from 'react';
import ScrollToTop from './ScrollToTop';
import { Switch, Route, Redirect } from 'react-router-dom';

import CrudClient from './../pages/customer/Crud';
import ChartPage from './../pages/charts';

export default () => {
  return <ScrollToTop>
    <Switch>
      <Route exact path={'/customers'} component={CrudClient} />
      <Route exact path={'/customers/page=:page'} component={CrudClient} />
      <Route exact path={'/customers/:id/edit'} component={CrudClient} />
      <Route exact path={'/customers/:id/edit/page=:page'} component={CrudClient} />
      <Route exact path={'/charts'} component={ChartPage} />
      <Redirect to={{ pathname: '/customers/' }} />
    </Switch>
  </ScrollToTop>
}

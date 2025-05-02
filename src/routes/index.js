import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import User from '../pages/User';

const routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/user/:username" component={User} />
    </Switch>
  );
};

export default routes;

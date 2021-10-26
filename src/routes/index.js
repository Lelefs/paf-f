import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import User from '../pages/User';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/user/:username" component={User} />
    </Switch>
  );
};

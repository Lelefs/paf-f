import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Calculadora from '../pages/Calculadora';

const routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/user/:username" component={User} />
      <Route path="/calculadora" component={Calculadora} />
    </Switch>
  );
};

export default routes;

import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';

import './styles/global.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Container>
        <BrowserRouter>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;

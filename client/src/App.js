import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import ApolloProvider from './context/apollo';
import { AuthProvider } from './context/auth';
import AuthRoute from './components/AuthRoute';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Container>
          <BrowserRouter>
            <MenuBar />
            <Route exact path='/' component={Home} />
            <AuthRoute pub exact path='/signin' component={Signin} />
            <AuthRoute pub exact path='/signup' component={Signup} />
          </BrowserRouter>
        </Container>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

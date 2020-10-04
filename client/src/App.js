import React from 'react';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import { Switch, Redirect, Route  } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import Navtopbar from './components/Navtopbar';
import ProtectedRoute from './HOC/protectedRoute'

function App() {
  return (
    <div className="App">
      <Navtopbar/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/signUp' component={RegisterPage}/>
        <Route exact path='/signIn' component={LoginPage}/>
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;

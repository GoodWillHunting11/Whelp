import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './components/splash/Login';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import LogoutButton from './components/auth/LogoutButton';
import SplashPage from './components/splash/SplashPage';
import NewBusinessForm from './components/authenticated/NewBusinessForm';
import { authenticate } from './store/session';
import { getAllBusinesses } from './store/business';
import * as sessionActions from './store/session'

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      // await dispatch(authenticate());
      // setLoaded(true);
      await dispatch(sessionActions.authenticate()).then(() => setLoaded(true));

    })();
  }, [dispatch]);

  useEffect(() => {
    (async() => {
      // await dispatch(authenticate());
      // setLoaded(true);
      await dispatch(sessionActions.authenticate()).then(() => setLoaded(true));
      await dispatch(getAllBusinesses())
    })();
  }, [loaded]);

  if (!user) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage page='login'/>
          </Route>
          <Route path='/signup' exact={true}>
            <LoginPage page='signup' />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }

  return loaded && (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <h1>Hellmo</h1>
          <LogoutButton />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/businesses/new' exact={true}>
            <NewBusinessForm />
          </Route>
        <Route>
            Whelp! There's nothing here.
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

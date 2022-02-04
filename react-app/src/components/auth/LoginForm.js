import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-main'>
    <form className='login-form' onSubmit={onLogin}>
      <div className='title'>You need to log in to Whelp!</div>
      <div className='subtitle'>New to Whelp? <Link className='sign-up-link' to='/signup'> Sign up here.</Link></div>
      <div className='log-graph'>By logging in, you agree to Whelp's policy of petting puppies when they are good bois and good girls.</div>
      <div className='subtitle'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='label-container'>
        <label htmlFor='email'>
        <input
          className='login-label'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        </label>
      </div>
      <div className='label-container'>
        <label htmlFor='password'>
        <input
          className='login-label'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </label>
        <div className='button-container'>
          <button type='submit'>Login</button>
        </div>
        <div className='sign-up'><div className='i-need-a-damn-space'>New to Whelp?</div> <Link className='sign-up-link' to='/signup'> Sign up</Link></div>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, zipcode));
      if (data) {
        setErrors(data)
      }
    }
    else {
      setErrors(['Confirm Password field must be the same as the Password field.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateZipcode = (e) => {
    setZipcode(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-main-signup'>
      <form className='login-form' onSubmit={onSignUp}>
        <div className='title'>Sign Up for Whelp</div>
          <div className='subtitle'>Connect with great local businesses</div>
          <div className='log-graph'>By creating an account, you agree to Whelp's policy of petting puppies when they are good bois and good girls.</div>
        <div className='subtitle'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='label-container'>
          <label>
            <input
              className='login-label'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='User Name'
              autoComplete="off"
            ></input>
          </label>
        </div>
        <div className='label-container'>
          <label>
            <input
              className='login-label'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
              autoComplete="off"
            ></input>
          </label>
        </div>
        <div className='label-container'>
          <label>
            <input
              className='login-label'
              type='text'
              name='zipcode'
              onChange={updateZipcode}
              value={zipcode}
              placeholder='Zipcode'
              autoComplete="off"
            ></input>
          </label>
        </div>
        <div className='label-container'>
          <label>
            <input
              className='login-label'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
            ></input>
          </label>
        </div>
        <div className='label-container'>
          <label>
            <input
              className='login-label'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}

              placeholder='Confirm Password'
            ></input>
          </label>
        </div>
        <div className='button-container'>
          <button type='submit'>Sign Up</button>
        </div>
        <div className='sign-up'><div className='i-need-a-damn-space'>Already on Whelp?</div> <Link className='sign-up-link' to='/login'> Log in</Link></div>
      </form>
    </div>
  );
};

export default SignUpForm;

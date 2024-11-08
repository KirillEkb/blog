import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Form from '../Form/Form';
import LoadOrError from '../LoadOrError/LoadOrError';
import { loginUser } from '../../api/api';
import { mainPath, signUpPath } from '../../pathes';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.app.user);
  useEffect(() => {
    if (token) {
      navigate(mainPath);
    }
  }, [token, navigate]);
  const onSubmit = (data) => {
    dispatch(loginUser(data));
    if (token) {
      navigate(mainPath);
    }
  };

  const labels = [
    {
      key: 'email',
      labelText: 'Email address',
      type: 'email',
      register: 'email',
    },
    {
      key: 'password',
      labelText: 'Password',
      type: 'password',
      register: 'password',
    },
  ];
  const submitButton = { text: 'Sign in ', disabled: false };
  const bottomText = {
    text: 'Don’t have an account?',
    link: signUpPath,
    linkText: 'Sign Up',
  };
  return (
    <>
      <LoadOrError />
      <Form legend="Sign in" onSubmit={onSubmit} labels={labels} submitButton={submitButton} bottomText={bottomText} />
    </>
  );
};

export default SignIn;

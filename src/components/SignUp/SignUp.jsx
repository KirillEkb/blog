import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Form from '../Form/Form';
import LoadOrError from '../LoadOrError/LoadOrError';
import { createUser } from '../../api/api.js';
import classes from '../Form/Form.module.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { token } = useSelector((state) => state.app.user);
  const { userCreated } = useSelector((state) => state.app);
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (userCreated) {
      navigate('/sign-in');
    }
  }, [userCreated, navigate]);
  const {
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createUser(data));
  };

  const labels = [
    {
      key: 'username',
      labelText: 'Username',
      type: 'text',
      register: 'username',
    },
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
    {
      key: 'repeatPassword',
      labelText: 'Repeat password',
      type: 'password',
      register: 'repeatPassword',
    },
  ];

  const submitButton = {
    text: 'Create',
    disabled: !isChecked,
  };

  const toggleCheckBox = (e) => {
    e.preventDefault();
    setIsChecked((prev) => !prev);
    setValue('checked', !isChecked);
  };
  const bottomText = { text: 'Already have an account? ', link: '/sign-in', linkText: 'Sign in' };
  return (
    <>
      <LoadOrError />
      <Form
        legend="Create new account"
        onSubmit={onSubmit}
        labels={labels}
        submitButton={submitButton}
        bottomText={bottomText}
      >
        <span className={classes.text}>
          <button
            type="button"
            onClick={toggleCheckBox}
            className={`${classes.checkButton} ${isChecked ? classes.checkButton__checked : ''}`}
          />
          I agree to the processing of my personal information
        </span>
        <p className={`${classes.errorText} ${errors.checked ? classes.visible : ''}`}>{errors.checked?.message}</p>
      </Form>
    </>
  );
};

export default SignUp;

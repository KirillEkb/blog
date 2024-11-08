import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Form from '../Form/Form';
import LoadOrError from '../LoadOrError/LoadOrError';
import { editProfile } from '../../api/api';
import { signInPath, mainPath } from '../../pathes';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const authToken = localStorage.getItem('authToken');
  useEffect(() => {
    console.log(user);
    if (!user.token && !authToken) {
      navigate(signInPath);
    }
  }, []);

  const labels = [
    {
      key: 'username',
      labelText: 'Username',
      type: 'text',
      register: 'username',
      value: user.username,
    },
    {
      key: 'email',
      labelText: 'Email address',
      type: 'email',
      register: 'email',
      value: user.email,
    },
    {
      key: 'new password',
      labelText: 'New Password',
      type: 'password',
      register: 'new password',
    },
    {
      key: 'avatar',
      labelText: 'Avatar image(url)',
      type: 'string',
      register: 'avatar',
      value: user.image,
    },
  ];
  const submitButton = { text: 'Save', disabled: false };
  const onSubmit = (data) => {
    dispatch(editProfile(data));
    if (
      user.username == data.username &&
      user.email == data.email &&
      user.image == data.avatar &&
      (user.password == data['new password'] || data['new password'] === '')
    ) {
      navigate(mainPath);
    }
  };
  return (
    <>
      <LoadOrError />
      <Form legend="Edit profile" labels={labels} submitButton={submitButton} onSubmit={onSubmit} />;
    </>
  );
};

export default EditProfile;

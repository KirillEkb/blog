import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../Button/Button';
import LinkButton from '../LinkButton/LinkButton';
import Label from '../Label/Label';

import classes from './Form.module.scss';

const Form = ({
  legend,
  onSubmit,
  labels,
  submitButton,
  bottomText = { text: '', link: '', linkText: '' },
  children,
}) => {
  const createValidationSchema = (labels) => {
    const schemaShape = {};

    labels.forEach((label) => {
      switch (label.register) {
        case 'username':
          schemaShape[label.register] = yup
            .string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username cannot exceed 20 characters')
            .required('Username is required');
          break;
        case 'email':
          schemaShape[label.register] = yup.string().email('Must be a valid email').required('Email is required');
          break;
        case 'password':
          schemaShape[label.register] = yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password cannot exceed 40 characters')
            .required('Password is required');
          break;
        case 'repeatPassword':
          schemaShape[label.register] = yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password');
          break;
        case 'new password':
          schemaShape[label.register] = yup
            .string()
            .test('empty', 'Password must be at least 6 characters and no more than 40 characters', (value) => {
              if (!value) return true;
              return value.length >= 6 && value.length <= 40;
            });
          break;

        case 'checked':
          schemaShape[label.register] = yup.boolean();
          break;
        case 'avatar':
          schemaShape[label.register] = yup.string();
          break;
        default:
          break;
      }
    });
    return yup.object().shape(schemaShape);
  };

  const schema = createValidationSchema(labels);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const labelsList = labels.map((label) => (
    <Label key={label.key} label={label} register={register} errors={errors} defaultValue={label.value} />
  ));

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.legend}>{legend}</h2>
      {labelsList}
      {children}
      <Button type="submit" pclass="CreateAccount" text={submitButton.text} disabled={submitButton.disabled} />
      <p className={classes.text}>
        {bottomText.text}
        <LinkButton to={bottomText.link} pclass="bottomLink" text={bottomText.linkText} />
      </p>
    </form>
  );
};

export default Form;

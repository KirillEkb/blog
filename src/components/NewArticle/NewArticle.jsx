import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../Button/Button';
import Label from '../Label/Label';
import TagAdded from '../TagAdded/TagAdded';
import LoadOrError from '../LoadOrError/LoadOrError';
import classes from '../Form/Form.module.scss';
import { createArticle, editArticle } from '../../api/api';

import newClasses from './NewArticle.module.scss';

const newArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slugParam } = useParams();
  const { token } = useSelector((state) => state.app.user);
  const { post } = useSelector((state) => state.app);
  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  });
  const [tags, setTags] = useState([...((slugParam && post.tagList) || '')]);
  const labels = [
    {
      key: 'title',
      labelText: 'Title',
      type: 'text',
      register: 'title',
      value: slugParam ? post.title : '',
    },
    {
      key: 'shortDescription',
      labelText: 'Short description',
      type: 'text',
      register: 'description',
      value: slugParam ? post.description : '',
    },
    {
      key: 'text',
      labelText: 'Text',
      type: 'text',
      register: 'body',
      textarea: true,
      value: slugParam ? post.body : '',
    },
  ];
  const createValidationSchema = (labels) => {
    const schemaShape = {};
    labels.forEach((label) => {
      switch (label.register) {
        case 'title':
          schemaShape[label.register] = yup.string().required('Title is required');
          break;
        case 'shortDescription':
          schemaShape[label.register] = yup.string().required('Short description is required');
          break;
        case 'text':
          schemaShape[label.register] = yup.string().required('Text is required');
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
  const labelList = labels.map((label) => {
    return <Label key={label.key} label={label} register={register} errors={errors} />;
  });
  const addTag = (e) => {
    e.preventDefault();
    setTags((tags) => [...new Set([...tags, ''])]);
  };
  const tagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags([...new Set(updatedTags)]);
  };
  const tagsEnter = (e) => {
    if (e.key === 'Enter') {
      addTag(e);
    }
  };
  const tagList = tags.map((el, index) => (
    <TagAdded
      key={index}
      tag={el}
      setTags={setTags}
      onChange={(e) => tagChange(index, e.target.value, e)}
      onKeyDown={tagsEnter}
    />
  ));
  const onSubmit = (data) => {
    if (slugParam) {
      dispatch(editArticle({ ...data, tagList: tags, slug: slugParam }));
    } else dispatch(createArticle({ ...data, tagList: tags }));
    navigate('/');
  };
  return (
    <>
      <LoadOrError />
      {token && (
        <form className={newClasses.form} onSubmit={handleSubmit(onSubmit)}>
          <legend className={classes.legend}>Create new article</legend>
          {labelList}
          <div className={newClasses.tagList}>
            <span className={newClasses.tagListText}>Tags</span>
            {tagList}
            <Button pclass="add" onClick={addTag} text="Add tag"></Button>
          </div>
          <Button pclass="send" text="Send"></Button>
        </form>
      )}
    </>
  );
};

export default newArticle;

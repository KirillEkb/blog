import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Popconfirm } from 'antd';

import Button from '../Button/Button';
import LinkButton from '../LinkButton/LinkButton';
import Like from '../Like/Like';
import LoadOrError from '../LoadOrError/LoadOrError';
import { getArticle, deleteArticle } from '../../api/api';
import { mainPath } from '../../pathes';

import classes from './Article.module.scss';

function Article() {
  const { slugParam } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getArticle({ slug: slugParam }));
  }, [dispatch, slugParam]);

  const { post, error, user } = useSelector((state) => {
    return state.app;
  });
  const {
    author,
    description,
    body,
    createdAt,
    updatedAt,
    favoritesCount,
    tagList = [],
    title,
    favorited,
  } = post ?? {};

  const tagText = (tag) => {
    if (tag.length > 10) {
      tag = tag.split(' ')[0];
      if (tag.length > 10) {
        tag = tag.slice(0, 10);
      }
    }
    return tag;
  };

  const tags = tagList.map((el, index) => (
    <Button key={el + index} pclass="tag" wrapClass={classes.tag} text={tagText(el)} />
  ));

  const myArticle = user?.username === author?.username;
  const deletePost = (e) => {
    e.preventDefault();
    dispatch(deleteArticle(slugParam));
    navigate(mainPath);
  };

  return (
    <>
      <LoadOrError />
      {!error && post && (
        <div className={classes.post}>
          <Markdown className={classes.title}>{title}</Markdown>
          <span className={classes.likes}>
            <Like favorited={favorited} slugParam={slugParam} /> {favoritesCount}
          </span>
          <div>{tags}</div>
          <Markdown className={classes.description}>{description}</Markdown>
          {myArticle && (
            <div className={classes.buttons}>
              <Popconfirm
                title="Delete the article"
                description="Are you sure to delete this article?"
                onConfirm={(e) => deletePost(e)}
                placement="rightTop"
                okText="Yes"
                cancelText="No"
              >
                <Button pclass="delete" text="Delete" />
              </Popconfirm>
              <LinkButton to={`/articles/${slugParam}/edit`} pclass="edit" text="Edit" />
            </div>
          )}
          <Markdown className={classes.text}>{body}</Markdown>
          <span className={classes.author}>{author.username}</span>
          <span className={classes.date}>{format(new Date(updatedAt || createdAt), 'MMMM dd, yyyy')}</span>
          <img className={classes.avatar} src={author.image} width="48px" height="48px" alt="author" />
        </div>
      )}
    </>
  );
}

export default Article;

import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import Button from '../Button/Button';
import Like from '../Like/Like';
import LoadOrError from '../LoadOrError/LoadOrError';
import { getArticle, deleteArticle } from '../../api/api';

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
  console.log(post);
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
  const noAvatar = './images/noAvatar.png';

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
    navigate('/');
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
              <Button onClick={(e) => deletePost(e)} pclass="delete" text="Delete" />
              <Link to={`/articles/${slugParam}/edit`}>
                <Button pclass="edit" text="Edit" />
              </Link>
            </div>
          )}
          <Markdown className={classes.text}>{body}</Markdown>
          <span className={classes.author}>{author.username}</span>
          <span className={classes.date}>{format(new Date(updatedAt || createdAt), 'MMMM dd, yyyy')}</span>
          <img className={classes.avatar} src={author.image || noAvatar} width="48px" height="48px" alt="author" />
        </div>
      )}
    </>
  );
}

export default Article;

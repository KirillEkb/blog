import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import LoadOrError from '../LoadOrError/LoadOrError';
import Like from '../Like/Like';

import classes from './Post.module.scss';

function Post(props) {
  const { post, likes, title, tag, text, author, date, avatar } = classes;
  const articleText = props.body && props.body.length > 200 ? props.body.slice(0, 200) + '...' : props.body;
  const tagText = (tag) => {
    if (tag.length > 10) {
      tag = tag.split(' ')[0];
      if (tag.length > 10) {
        tag = tag.slice(0, 10);
      }
    }
    return tag;
  };

  const tags = props.tagList
    .slice(0, 3)
    .map((el, index) => <Button key={el + index} pclass="tag" className={tag} text={tagText(el)} />);

  return (
    <>
      <LoadOrError />
      <div className={post}>
        <Link to={`/article/${props.slug}`} className={title}>
          {props.title}
        </Link>
        <span className={likes}>
          <Like favorited={props.favorited} slugParam={props.slug} /> {props.favoritesCount}
        </span>
        <div>{tags}</div>
        <div className={text}>{articleText}</div>
        <span className={author}>{props.author.username}</span>
        <span className={date}>{format(new Date(props.createdAt), 'MMMMMM dd,yyyy')}</span>
        <img className={avatar} src={props.author.image} width="48px" height="48px" alt="Фото" />
      </div>
    </>
  );
}

export default Post;

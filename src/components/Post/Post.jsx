import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import Like from '../Like/Like';
import classes from '../Article/Article.module.scss';

import postClasses from './Post.module.scss';

function Post({ body = '', tagList = [], slug, title, author, createdAt, favoritesCount, favorited }) {
  const articleText = body && body.length > 200 ? body.slice(0, 200) + '...' : body;
  const tagText = (tag) => {
    if (tag.length > 10) {
      tag = tag.split(' ')[0];
      if (tag.length > 10) {
        tag = tag.slice(0, 10) || '';
      }
    }
    return tag;
  };
  const tags = tagList
    ?.slice(0, 3)
    .map((el, index) => <Button key={el + index} pclass="tag" className={classes.tag} text={tagText(el)} />);

  return (
    <>
      <div className={postClasses.post}>
        <Link to={`/article/${slug}`} className={classes.title}>
          {title}
        </Link>
        <span className={classes.likes}>
          <Like favorited={favorited} slugParam={slug} /> {favoritesCount}
        </span>
        <div>{tags}</div>
        <div className={classes.text}>{articleText}</div>
        <span className={classes.author}>{author.username}</span>
        <span className={classes.date}>{format(new Date(createdAt), 'MMMMMM dd,yyyy')}</span>
        <img className={classes.avatar} src={author.image} width="48px" height="48px" alt="Фото" />
      </div>
    </>
  );
}

export default Post;

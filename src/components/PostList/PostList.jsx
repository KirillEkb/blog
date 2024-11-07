import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Post from '../Post/Post';
import Footer from '../Footer/Footer.jsx';
import LoadOrError from '../LoadOrError/LoadOrError';
import { getPosts } from '../../api/api';

import classes from './PostList.module.scss';

function PostList() {
  const { posts, error, offset } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(offset));
  }, [offset]);
  return (
    <>
      <LoadOrError />
      <div className={classes.postList}>
        {!error &&
          posts.map((post) => {
            return <Post key={`${post.slug}`} {...post} />;
          })}
      </div>
      <Footer />
    </>
  );
}

export default PostList;

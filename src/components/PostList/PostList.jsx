import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import Post from '../Post/Post';
import Footer from '../Footer/Footer.jsx';
import LoadOrError from '../LoadOrError/LoadOrError';
import { getPosts } from '../../api/api';

import classes from './PostList.module.scss';

function PostList() {
  const { posts, loading, error, offset } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(offset));
  }, [offset]);
  return (
    <>
      <LoadOrError />
      <div className={classes.postList}>
        {loading && <Spin size="large" />}
        {error && !loading && (
          <Offline>
            <Alert type="error" message="Check your connection"></Alert>
          </Offline>
        )}
        {error && (
          <Online>
            <Alert type="error" message="Something went wrong"></Alert>
          </Online>
        )}
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

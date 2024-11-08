import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorComponent from '../ErrorComponent/ErrorComponent';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import Article from '../Article/Article';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import EditProfile from '../EditProfile/EditProfile';
import NewArticle from '../NewArticle/NewArticle';
import { isLoggedIn } from '../../api/api';
import {
  mainPath,
  signInPath,
  signUpPath,
  editProfilePath,
  newArticlePath,
  articlePath,
  articleEditPath,
} from '../../pathes';

import classes from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.app.user);
  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch, token]);

  return (
    <ErrorComponent>
      <BrowserRouter>
        <div className={classes.app}>
          <Header />
          <Routes>
            <Route path={mainPath} element={<PostList />} />
            <Route path={articlePath} element={<Article />} />
            <Route path={signUpPath} element={<SignUp />} />
            <Route path={signInPath} element={<SignIn />} />
            <Route path={editProfilePath} element={<EditProfile />} />
            <Route path={newArticlePath} element={<NewArticle />} />
            <Route path={articleEditPath} element={<NewArticle />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorComponent>
  );
}

export default App;

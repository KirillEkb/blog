import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import Article from '../Article/Article';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import EditProfile from '../EditProfile/EditProfile';
import NewArticle from '../NewArticle/NewArticle';
import { isLoggedIn } from '../../api/api';

import classes from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/article/:slugParam" element={<Article />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article/" element={<NewArticle />} />
          <Route path="/articles/:slugParam/edit" element={<NewArticle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

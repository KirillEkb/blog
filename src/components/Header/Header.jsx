import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';

import classes from './Header.module.scss';

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const { username, token, image } = user;
  const noAvatar = './images/noAvatar.png';
  const LogOut = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <Button pclass="noBorder" text="Realworld Blog"></Button>
      </Link>
      <div className={classes.buttons}>
        {token && (
          <>
            <Link to="/new-article">
              <Button pclass="createArticle" text="Create article"></Button>
            </Link>
            <Link to="/profile" className={classes.profile}>
              <span className={classes.username}>{username}</span>
              <img className={classes.avatar} src={image || noAvatar}></img>
            </Link>
          </>
        )}
        {!token && (
          <Link to="/sign-in">
            <Button pclass="noBorder" text="Sign in"></Button>
          </Link>
        )}
        {token && <Button onClick={LogOut} pclass="noBorder" text="Log out"></Button>}
        {!token && (
          <Link to="/sign-up">
            <Button text="Sign up"></Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

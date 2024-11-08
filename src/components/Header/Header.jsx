import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';
import LinkButton from '../LinkButton/LinkButton';
import { mainPath, signInPath, signUpPath, newArticlePath } from '../../pathes';

import classes from './Header.module.scss';

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const { username, token, image } = user;
  const LogOut = () => {
    localStorage.removeItem('authToken');
    navigate(mainPath);
    window.location.reload();
  };
  return (
    <header className={classes.header}>
      <LinkButton to={mainPath} pclass="noBorder" text="Realworld Blog"></LinkButton>
      <div className={classes.buttons}>
        {token && (
          <>
            <LinkButton to={newArticlePath} pclass="createArticle" text="Create article" />
            <Link to="/profile" className={classes.profile}>
              <span className={classes.username}>{username}</span>
              <img className={classes.avatar} src={image}></img>
            </Link>
          </>
        )}
        {!token && <LinkButton to={signInPath} pclass="noBorder" text="Sign in" />}
        {token && <Button onClick={LogOut} pclass="noBorder" text="Log out"></Button>}
        {!token && <LinkButton to={signUpPath} text="Sign up" />}
      </div>
    </header>
  );
}

export default Header;

/* eslint-disable no-restricted-globals */
import Store from 'store';
import Login from 'page/login';
import PageNotFound from 'page/page-not-fount';
import Profile from 'page/profile';
import SignUp from 'page/sign-up';

const ROOT = '#root';
const store = new Store();
const login = new Login(ROOT, { store });
const signup = new SignUp(ROOT);
const profile = new Profile(ROOT, { store });
const pageNotFound = new PageNotFound(ROOT);

const router = () => {
  const path = location.hash.replace('#', '');

  switch (path) {
    case '':
    case 'login':
      login.render();
      break;
    case 'signup':
      signup.render();
      break;
    case 'profile':
      profile.render();
      break;
    default:
      pageNotFound.render();
  }
};

router();
window.addEventListener('hashchange', router);

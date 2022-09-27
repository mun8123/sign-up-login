/* eslint-disable no-restricted-globals */
import Store from 'store';
import Login from 'page/login';
import PageNotFound from 'page/page-not-fount';
import Profile from 'page/profile';

const ROOT = '#root';
const store = new Store();
const login = new Login(ROOT, { store });
const pageNotFound = new PageNotFound(ROOT);
const profile = new Profile(ROOT, { store });

const router = () => {
  const path = location.hash.replace('#', '');

  switch (path) {
    case '':
    case 'login':
      login.render();
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

/* eslint-disable no-restricted-globals */
import Store from 'store';
import Login from 'page/login';

const ROOT = '#root';
const store = new Store();
const login = new Login(ROOT, { store });

const router = () => {
  const path = location.hash.replace('#', '');

  switch (path) {
    case '':
    case 'login':
      login.render();
      break;
    default:
      console.log('404');
  }
};

router();
window.addEventListener('hashchange', router);

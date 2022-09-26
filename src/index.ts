/* eslint-disable no-restricted-globals */
import Login from 'page/login';

const ROOT = '#root';

const router = () => {
  const path = location.hash.replace('#', '');
  const login = new Login(ROOT);

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

import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('port', port);

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  return axios({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: 'https://dummyjson.com/auth/login',
    data: JSON.stringify({ username, password }),
  })
    .then(result => {
      const userData = result.data;
      const { id, token } = userData;
      res.status(200).send({
        status: 'OK',
        result: { id, token },
      });
    })
    .catch(error => {
      res.status(400).send({
        status: '400 Error',
      });
    });
});

app.get('/user/:id', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }
  return axios
    .get(`https://dummyjson.com/users/${req.params.id}`)
    .then(result => {
      const userProfile = result.data;
      const { id, firstName, lastName, email, phone, image } = userProfile;
      res.status(200).send({
        status: 'OK',
        result: {
          id,
          firstName,
          lastName,
          email,
          phone,
          image,
        },
      });
    })
    .catch(e => {
      res.status(400).send({
        status: 'Error',
      });
    });
});

app.listen(app.get('port'), () => {
  console.log(`listen to ${app.get('port')} port`);
});

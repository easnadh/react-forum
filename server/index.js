const express = require('express');
const cors = require('cors');
const nanoid = require("nanoid");
const app = express();
app.use(express.json())

const port = process.env.PORT || 3001;

app.use(
    cors({
      credentials: true, // чтобы работали secured куки
      origin: true // автоматом подставляется текущий сервер в Origin
    })
);


// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : ''
// });

const users = [{
  id: nanoid(),
  login: "123",
  password: "123"
}]

app.get('/', (req, res) => {
  res.status(200).json('Work hard, die fast'); // отправка ответа
});

app.post('/reg', (req, res) => {

  if (users.find(user => user.login === req.body.login)) {
    res.status(400).json({
      message: "логин уже занят"
    })
  }

  const newUser = {
    id: nanoid(),
    login: req.body.login,
    password: req.body.password
  }
  users.push(newUser)
  console.log(users)
  res.status(200).json(newUser)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
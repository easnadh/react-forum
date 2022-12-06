const express = require('express');
const cors = require('cors');
const nanoid = require("nanoid");
const cookies = require("cookie-parser")
const app = express();

app.use(express.json())
app.use(cookies())

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

const tokens = [{
  userId: "312312",
  token: "123213",
  createdAt: Date()
}]

// GET
app.get('/', (req, res) => {
  res.status(200).json('Work hard, die fast'); // отправка ответа
});

app.get('/auth', (req, res) => {
  const token = req.cookies.token
  const foundToken = tokens.find(tokenItem => tokenItem.token === token)
  if(!foundToken) {
    return res.status(401).json({
      message: "пользователь не авторизован"
    })
  }
  const user = users.find(user => user.id === foundToken.userId)
  res.status(200).json(user)
});

// POST
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
  res.status(200).json(newUser)
});

app.post('/auth', (req, res) => {

  const user = users.find(user => user.login === req.body.login)

  if (!user) {
    return res.status(404).json({
      message: "пользователь не найден"
    })
  }

  if (user.password !== req.body.password) {
    return res.status(400).json({
      message: "неверный пароль"
    })
  }

  const token = nanoid();
  tokens.push({
    userId: user.id,
    token,
    createdAt: Date()
  })
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production'
  })

  // console.log(users)
  res.status(200).json({ok: true})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
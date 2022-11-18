const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!'); // отправка ответа
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
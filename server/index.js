const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`))
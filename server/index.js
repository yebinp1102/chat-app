const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const authRoutes = require('./routes/auth.js');
require('dotenv').config();

app.use(cors()); // cross-origin-request를 위한 것
app.use(express.json()); // json payload를 프론트에서 백엔드로 보낼 수 있게 한다.
app.use(express.urlencoded());

// 단순 서버가 동작하는지 확인하기 위한 라우터. 
app.get('/', (req, res) => {
  res.send('Hello World')
});

// 로그인 회원가입 등의 인증 기능과 관련된 것들은 authRoutes에서 별도로 관리.
app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`))


const express = require('express')
const router = express.Router();
const {signup, login} = require('../controllers/auth')

// 로그인과 회원가입 라우터를 post를 사용하는 이유는 프론트에서 백엔드에게 데이터(payload)를 보내기 때문이다. 
router.post('/signup', signup);
router.post('/login', login);

module.exports = router
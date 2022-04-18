const {connect} = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const crypto = require('crypto')

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try{
    const {fullName, username, password, phoneNumber} = req.body;
    const userId = crypto.randomBytes(16).toString('hex'); // crypto를 이용해 랜덤한 16진수의 문자열을 만든다.
    const serverClient = connect(api_key, api_secret, app_id);  // serverClient는 유저 토큰을 생성하기 위해 사용될 것이다.
    const hashedPassword = await bcrypt.hash(password, 10);  // hash 메서드는 패스워드를 레벨 10정도의 암호화 수준을 사용.
    const token = serverClient.createUserToken(userId);
    res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber})
  }catch(err){
    console.log(err)
    res.status(500).json({message: err})
  }
};

const login = (req, res) => {
  try{
    const {username, password} = req.body;
    const serverClient = connect(api_key, api_secret, app_id);  // serverClient는 유저 토큰을 생성하기 위해 사용될 것이다.
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({name: username})
    if(!users.length) return res.status(400).json({message: '존재하지 않는 유저입니다.'})
    const success = await bcrypt.compare(password, users[0].hashedPassword)
    const token = serverClient.createUserToken(users[0].id);
    if(success){
      return res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id })
    }else{
      return res.status(500).json({ message: '올바르지 않은 비밀번호 입니다.' })
    }
  }catch(err){
    console.log(err)
    res.status(500).json({message: err})
  }
};

module.exports = { signup, login}
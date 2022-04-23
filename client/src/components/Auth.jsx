import React,{ useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signinImage from '../assets/loginImage.svg'

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, phoneNumber, avatarURL } = form;
    const URL = 'http://localhost:5000/auth';
    // 엔드 포인트는 isSignup의 상태 값에 따라
    // true이면, http://localhost:5000/auth/signup
    // false이면, http://localhost:5000/auth/login
    // axios로 서버로 응답 받은 data는 cookies에 저장하기 위해 token, userId, hasedPassword로 다시 구조화
    const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL,
    });

    // 서버로부터 받는 모든 데이터는 cookies라는 객체에 저장한다. 
    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if(isSignup){
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    // 쿠키에 데이터 저장이 끝나면, 페이지를 리렌더링한다. 
    window.location.reload();
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup)=>!prevIsSignup)
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? '회원가입' : '로그인'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>이름</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder='이름'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>유저명</label>
              <input
                name="username"
                type="text"
                placeholder='유저명'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='phoneNumber'>전화번호</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder='전화번호'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='avatarURL'>프로필 이미지</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder='프로필 이미지'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>비밀번호</label>
              <input
                name="password"
                type="password"
                placeholder='비밀번호'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>비밀번호 확인</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder='비밀번호 확인'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button type='submit'>{isSignup ? "회원가입" : "로그인"}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
              <p>
                {isSignup ? '이미 게정이 있으신가요?' : '계정이 없으신가요?'}
                <span onClick={switchMode}>
                  {isSignup ? "로그인" : "회원가입"}
                </span>
              </p>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={signinImage} alt="회원가입" />
      </div>
    </div>
  )
}

export default Auth
import React, { useState } from 'react'

// stream chat api
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import 'stream-chat-react/dist/css/index.css'

// 쿠키
import Cookies from 'universal-cookie'

// 컴포넌트
import { ChannelListContainer, ChannelContainer, Auth} from './components'

// CSS
import './App.css'

const cookies = new Cookies();
const apiKey = '5ybq95mvc2w9';
const client = StreamChat.getInstance(apiKey);  // stream-chat의 인스턴스 생성
const authToken = cookies.get("token")

if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber')
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme="team light">
        <ChannelListContainer  // 사이드바 컴포넌트
          isCreating={isCreating}  
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer  // 실제 채팅 기능 구현한 컴포넌트
          isCreating={isCreating}  
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  )
}

export default App
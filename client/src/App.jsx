import React from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { SideBar, ChannelContainer} from './components'
import './App.css'

const apiKey = '5ybq95mvc2w9';

const client = StreamChat.getInstance(apiKey);

const App = () => {
  return (
    <div className='app_wrapper'>
      <Chat client={client} theme="team light">
        <SideBar />
        <ChannelContainer />
      </Chat>
    </div>
  )
}

export default App
import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import UserList from './UserList';
import { CloseCreateChannel } from '../assets/CloseCreateChannel'

const ChannelNameInput = ({ channelName = '', setChannelName}) => {
  const { client, setActiveChannel} = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

    const handleChange = (e) => {
      e.preventDefault();
      setChannelName(e.target.value)
    }

  return(
    <div className='channel-name-input__wrapper'>
      <p>이름</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="채널 이름(공백 없이)"
      />
      <p>초대하기</p>
    </div>
  )
}

const EditChannel = ({setIsEditing}) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([])

  const updateChannel = async (e) => {
    e.preventDefault();
    const nameChanged = channelName !== (channel.data.name || channel.data.id)

    if(nameChanged){
      await channel.update({ name: channelName }, { text: `채널명이 ${channelName}으로 변경 되었습니다.` })
    }

    if(selectedUsers.length){
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false)
    setSelectedUsers([]);
  }

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p>채널 수정</p>
        <CloseCreateChannel setIsEditing={setIsEditing}/>
      </div>
      <ChannelNameInput 
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList 
        setSelectedUsers={setSelectedUsers}
      />
      <div className='edit-channel__button-wrapper' onClick={updateChannel}>
        <p>저장하기</p>
      </div>
    </div>
  )
}

export default EditChannel
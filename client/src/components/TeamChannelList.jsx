import React from 'react'

import { AddChannel } from '../assets/AddChannel'

const TeamChannelList = ({children, err = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing}) => {
  if(err){
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          연결에 에러가 있습니다. 잠시 기다렸다가 다시 시도해주세요. 
        </p>
      </div>
    ) : null
  }

  if(loading){
    return(
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? '채널' : '메세지'} loading ... 
        </p>
      </div>
    )
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? '그룹 채팅' : '개인 메세지'}
        </p>
        <AddChannel 
          isCreating={isCreating}  
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList
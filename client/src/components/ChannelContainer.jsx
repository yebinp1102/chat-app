import React from 'react'
import { Channel, useChatContext } from 'stream-chat-react'
import { ChannelInner, CreateChannel, EditChannel, TeamMessage} from './'

const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
  // 현재 체널에 대한 구체적인 정보를 제공한다.
  const { channel } = useChatContext();

  // 채널을 만드려는 경우
  if(isCreating){
    return(
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  // 채널을 수정하려는 경우
  if(isEditing){
    return(
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>첫번째 대화 기록입니다.</p>
      <p className='channel-empty__second'>메세지 보내기, 링크, 이모티콘, 더보기</p>
    </div>
  )

  return (
    <div className='channel__container'>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i)=><TeamMessage key={i} {...messageProps} />}
      >
        <ChannelInner 
          setIsEditing={setIsEditing}
        />
      </Channel>
    </div>
  )
}

export default ChannelContainer
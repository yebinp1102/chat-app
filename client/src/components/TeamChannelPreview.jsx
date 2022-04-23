import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  // 그룹 채팅방 미리보기 (=채팅망 이름 or 채팅방의 id값)
  const ChannelPreview = () => (
    <p className="channel-preview__item"> 
      # {channel?.data?.name || channel?.data?.id} 
    </p>
  );

  // 개인 메세지 이름(=유저명)
  const DirectPreview = () => {
    console.log(channel.state)
    // 모든 유저를 Object.values를 통해 매핑 -> 각 유저의 id를 비교해서 클라이언트(=지금 로그인 한 유저)의 id와 아닌 것만 출력한 것을 members 변수에 저장.
    // 즉 자신이 아닌 다른 유저들의 정보를 담은 리스트가 members 변수에 저장된다.
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    )
  }

  return (
    // 현재 채팅이 활성화 되었느냐 아니냐에 따라 다른 className이 지정된다. 
    <div className={
      channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
      }
      // 클릭하면 해당 채팅을 활성화(=activeChannel) 하기 위한 함수 제작
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if(setToggleContainer) {
          setToggleContainer((prevState) => !prevState)
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
}

export default TeamChannelPreview
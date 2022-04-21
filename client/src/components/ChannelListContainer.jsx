import React, { useState } from 'react'
import { ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelSearch, TeamChannelList, TeamChannelPreview} from '.'
import {BsFillChatSquareFill} from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

const cookies = new Cookies();

const SideBar = ({logout}) => (
  <nav className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <BsFillChatSquareFill />
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
        <FiLogOut />
      </div>
    </div>
  </nav>
)

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>Chat App</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter(channel => channel.type === 'team')
}
const customChannelMessagingFilter = (channels) => {
  return channels.filter(channel => channel.type === 'messaging')
}

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
  const { client } = useChatContext()

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber')

    window.location.reload()
  }

  const filters = {members: { $in: [client.userID] }}

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps)=>(
            <TeamChannelList 
              {...listProps}
              type="team"  // 메세지 종류는 크게 팀(그룹)메세지와 개인 메세지(DM)로 나뉘기 때문에, type으로 구분
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type="team"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps)=>(
            <TeamChannelList 
              {...listProps}
              type="messaging" 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type="messaging"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [ toggleContainer, setToggleContainer] = useState(false)
  return(
    <>
      {/* 테블릿 이상의 해상도를 가진 기기를 위한 컨테이너 */}
      <div className='channel-list__container'>
        <ChannelListContent 
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      {/* 모바일 기기를 위한 컨테이너 */}
      <div className='channel-list__container-responsive'
        style={{ left: toggleContainer ? "0%" : "-89%" , background: "#005fff"}}
      >
        <div className='channel-list__container-toggle' onClick={()=>setToggleContainer(prevToggleContainer => !prevToggleContainer)}>
        </div>
        <ChannelListContent 
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  )
}

export default ChannelListContainer
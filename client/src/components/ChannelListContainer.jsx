import React from 'react'
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

const ChannelListContainer = ({isCreating, setIsCreating, setCreateType, setIsEditing}) => {

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

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList 
          filters={{}}
          channelRenderFilterFn={()=>{ }}
          List={(listProps)=>(
            <TeamChannelList 
              {...listProps}
              type="team"  // 메세지 종류는 크게 팀(그룹)메세지와 개인 메세지(DM)로 나뉘기 때문에, type으로 구분
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type="team"
            />
          )}
        />
        <ChannelList 
          filters={{}}
          channelRenderFilterFn={()=>{ }}
          List={(listProps)=>(
            <TeamChannelList 
              {...listProps}
              type="messaging" 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContainer
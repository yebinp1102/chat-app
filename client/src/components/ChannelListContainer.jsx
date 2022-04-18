import React from 'react'
import { ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelSearch, TeamChannelList, TeamChannelPreview} from '.'
import {BsFillChatSquareFill} from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

const SideBar = () => (
  <nav className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <BsFillChatSquareFill />
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner'>
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

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
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
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type="team"
            />
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContainer
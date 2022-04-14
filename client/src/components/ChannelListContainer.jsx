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
      </div>
    </>
  )
}

export default ChannelListContainer
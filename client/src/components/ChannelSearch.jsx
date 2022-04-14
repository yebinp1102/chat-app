import React, { useState, useEffect } from 'react'
import { useChatContext } from 'stream-chat-react'
import {BiSearchAlt2} from 'react-icons/bi'

const ChannelSearch = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const getChannels = async(text) => {
    try{
      // 채널 연결
      
    }catch(err){
      setQuery('')
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true)
    setQuery(e.target.value)
    getChannels(e.target.value)
  }

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <BiSearchAlt2 className='channel-search__input_icon color-white'  />
        <input className='channel-search__input__text' 
          placeholder='검색'
          type='text'
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  )
}

export default ChannelSearch
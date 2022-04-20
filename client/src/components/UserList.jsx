import React, {useEffect, useState} from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'
import { InviteIcon } from '../assets/InviteIcon'

const ListContainer = ({children}) => {
  return(
    <div className='user-list__container'>
      <div className='user-list__header'>
        <p>사용자</p>
        <p>초대하기</p>
      </div>
      {children}
    </div>
  )
}

const UserItem = ({ user }) => {
  const [selected, setSelected] = useState(false)

  const handleSelect = () => {
    setSelected(preSelected => !preSelected)
  }

  return(
    <div className='user-item__wrapper' onClick={handleSelect}>
      <div className='user-item__name-wrapper'>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className='user-item__name'>{user.fullName || user.id}</p>
      </div>
      {selected ? 
        <InviteIcon /> 
        : 
        <div className='user-item__invite-empty' />
      }
    </div>
  )
}

const UserList = () => {
  const { client } = useChatContext()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [listEmpty, setListEmpty] = useState(false) 

  useEffect(()=>{
    const getUsers = async () => {
      if(loading) return;
      setLoading(true)
      try{
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        )
        if(response.users.length) setUsers(response.users)
        else{
          setListEmpty(true)
        }
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    }
    if(client) getUsers()
  },[])

  return (
    <ListContainer>
      {loading ? 
        <div className='user-list__message'>
          사용자 목록을 로딩 중입니다...
        </div>
        : 
        (
          users?.map((user, i)=> (
            <UserItem index={i} key={user.id} user={user} />
          ))
        )
      }
    </ListContainer>
  )
}

export default UserList
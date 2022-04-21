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

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false)

  const handleSelect = () => {
    if(selected){
      setSelectedUsers( prevUsers => prevUsers.filter((prevUser) => prevUser !== user.id ))
    }else{
      setSelectedUsers(prevUser => [...prevUser, user.id])
    }
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

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [listEmpty, setListEmpty] = useState(false)
  const [error, setError] = useState(false)

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
        setError(true)
      }
      setLoading(false)
    }
    if(client) getUsers()
  },[])

  if(error){
    return(
      <ListContainer>
        <div className='user-list__message'>
            로딩에 에러가 발생했습니다. 다시 시도 해주세요.
        </div>        
      </ListContainer>
    )
  }

  if(listEmpty){
    return(
      <ListContainer>
        <div className='user-list__message'>
            찾는 유저가 존재하지 않습니다. 
        </div>        
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      {loading ? 
        <div className='user-list__message'>
          사용자 목록을 로딩 중입니다...
        </div>
        : 
        (
          users?.map((user, i)=> (
            <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
          ))
        )
      }
    </ListContainer>
  )
}

export default UserList
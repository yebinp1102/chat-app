import React from 'react'
import { FcAddDatabase } from 'react-icons/fc'

export const AddChannel = ({setCreateType, setIsCreating, setIsEditing, type, setToggleContainer}) => {
  return (
    <FcAddDatabase 
      fontSize='20px'
      onClick={()=>{
        setCreateType(type)
        setIsCreating(preState => !preState)
        setIsEditing(false)
        if(setToggleContainer) setToggleContainer(preState => !preState)
      }}
    />
  )
}


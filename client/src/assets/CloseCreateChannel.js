import React from "react";
import {AiFillCloseCircle} from 'react-icons/ai'

export const CloseCreateChannel = ({setIsCreating, setIsEditing})=>(
  <AiFillCloseCircle 
    color="#006CFC"
    fontSize="1.5rem"
    onClick={()=>{
      if(setIsCreating) setIsCreating(false)
      if(setIsEditing) setIsEditing(false)
    }}
  />
)
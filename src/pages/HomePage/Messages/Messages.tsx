import React from 'react'
import Topbar from './Topbar'
import Typing from './Typing'
import UserMessages from './UserMessages'

const Messages = () => {
  return (
    <div className='messages'>
      <Topbar />
      <UserMessages />
      <Typing />
    </div>
  )
}

export default Messages

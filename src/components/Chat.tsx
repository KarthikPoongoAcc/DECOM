import React from 'react'
import "./Chat.scss";
import profile from '../assets/images/profile.svg';
import aiBOt from '../assets/images/icons8-robot.gif';
type Props = {}

function Chat({}: Props) {
  return (
    <div className='chat '>
        <div className='chat-container'>
          <div className='chat-container--list'>
            <div className='chat-container--right'>
              <div className='chat-container_user'>
                <div className='talk-bubble tri-right round right-in'>Prompt </div>
                <img src={profile} alt="User" />
              </div>
            </div>
            <div className='chat-container--left'>
              <div className='chat-container_user'>
                <img src={aiBOt} alt="Bot" />
                <div className='talk-bubble tri-left round left-in'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
              </div>              
            </div> 
                   
          </div>
        </div>
        <div className='chat-footer'>
          <div className='chatbox'>
            <input type='text' className='chat--textbox'></input>
            <button type='button' className='chat--sendbtn'></button>
          </div>
        </div>
    </div>
  )
}

export default Chat
import React from 'react'
import '../App.css'
function Home() {
  return (
    <div className='homepage'>
        <div className='FormContainer'>
            <form className='Form'>
                <input type='text' placeholder='Enter Room ID' className='FormInput'/>
                <input type='text' placeholder='Enter Your Username' className='FormInput'/>
                <button className='btn joinBtn'>Join</button>
                <span>
                    Don't have an Invite? <a href='/' className='create-room'>Create Room</a>
                </span>
            </form>
        </div>        
    </div>
  )
}

export default Home
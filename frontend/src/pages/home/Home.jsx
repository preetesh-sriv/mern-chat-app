import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    {/* Smaller screen and above -> 450 px */}
    <Sidebar/>
    <div className="w-1 bg-gray-400"></div>
    <MessageContainer/>
    </div>
  )
}

export default Home
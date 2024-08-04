// import MessageInput from "./MessageInput";
import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from 'react-icons/ti'

const MessageContainer = () => {
    const {selectedConversation , setSelectedConversation} = useConversation();

	useEffect(()=>{
		//cleanup function (unmounting)
		return () => setSelectedConversation(null)
	},[setSelectedConversation])
	/*
	The above cleanup function is imp since if you will not add it so after logging out if you will login again then the last chat is already open 
	*/
	return (
		<div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation ? <NoChatSelected/> :(
            <>
				{/* Header */}
				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
        )}
		</div>
	);
};
const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 Jay Kumar ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' /> {/*To handle responsiveness */}
			</div>
		</div>
	);
};
export default MessageContainer;
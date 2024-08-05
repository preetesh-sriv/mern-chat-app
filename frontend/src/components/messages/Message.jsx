import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../util/extractTime";
import useConversation from "../../zustand/useConversation";

const Message =  ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	if (!message || !authUser) {
        return null;
    }

	const fromMe = message.senderId === authUser._id;
	
//   console.log('fromMe:', fromMe, 'message.senderId:', message.senderId, 'authUser._id:', authUser._id); -> Working so I commented

  if (!message.senderId) {
	console.warn('message.senderId is undefined:', message);
	return null;  // or return a loading state/component
}
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
		</div>
	);
};
export default Message;

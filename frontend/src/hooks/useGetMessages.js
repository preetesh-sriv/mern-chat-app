import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
                // Since it is a get method so we did not add any options 
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);
/*
Optional Chaining (?.):
The ?. operator is called the optional chaining operator. It allows you to safely access deeply nested properties without having to explicitly check if each reference in the chain is null or undefined.
In this case, selectedConversation?._id will return undefined if selectedConversation is null or undefined. If selectedConversation is not null or undefined, it will return selectedConversation._id.

Conditional Check:
The condition if (selectedConversation?._id) checks if selectedConversation exists and if it has an _id property.
If selectedConversation is null or undefined, or if selectedConversation._id is undefined, the condition evaluates to false and getMessages will not be called.
If selectedConversation._id exists, the condition evaluates to true and getMessages will be called.

Calling getMessages:
If the condition is met, the getMessages function is called. This function fetches the messages for the selected conversation, sets the loading state to true while the fetch is in progress, and updates the state with the fetched messages once the fetch is complete.
*/

	return { messages, loading };
};
export default useGetMessages;

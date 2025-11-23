//Handles all message related activitiy
//Takes in the selected group

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Send, Users} from "lucide-react";
import {useLogin} from "../App.tsx";

function ChatPanel({selectedGroup,messages,setMessages,onManageGroup}) {

    //User Context
    const {user} = useLogin();



    if (!selectedGroup) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full border-2 text-gray-500 p-6 ">
                <Users className="w-16 h-16 mb-4 opacity-70" />
                <p className="text-lg font-medium">No group selected</p>
                <p className="text-ld text-gray-400 mt-1">
                    Choose a group from the left to start chatting.
                </p>
            </div>
        );
    }


    // const [messages, setMessages] = useState(mockMessages);
    const [input, setInput] = useState("");

    const navigate = useNavigate();

    const currentMessages = messages.filter(message => message.groupId === selectedGroup.id);

    const addMessageToGroup = (text) => {
        if (!text.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            groupId: selectedGroup.id,     // important
            sender: user?.email,     // or dynamic user
            text: text,
            date: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMessage]);
    };

    return (
        <>

            <div className="flex flex-col w-full min-w-[300px] border-2 border-t-0 border-b-0 ">
                {/*header*/}
                <div className="h-[10%] min-h-[50px] flex items-center justify-between border-b-2 px-4 ">
                    <div>
                        <p className="font-semibold ">{selectedGroup.name}</p>  {/*Group name*/}
                        <p className="text-sm text-gray-600">4 members</p>    {/*Number of members*/}
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <button
                            className="border-2 px-4 py-2 hover:bg-black hover:text-white transition-all duration-200  "
                            onClick={onManageGroup}
                        >

                            Manage
                        </button>
                        <button className="border-2 p-2 hover:bg-black hover:text-white transition-all duration-200  ">
                            <Users/>
                        </button>
                    </div>
                </div>
                {/*Chat-thread*/}
                <div className="h-[80%] min-h-[300px] p-4 overflow-y-auto" >
                    {/*Individual ChatHead*/}
                    <ul className={"space-y-2"}>
                        {currentMessages.map(message => (
                            <li key={message.id}>
                                <div className="border-2 min-w-[200px] max-w-[500px] p-4 flex justify-between items-end">
                                    <div className={"flex-1"}>
                                        <p className={"font-medium text-sm mb-1"}>{message.sender}</p>  {/*Username*/}
                                        <p className={"break-words"}>{message.text} </p> {/*Message*/}
                                    </div>
                                    <p className={"text-xs text-gray-600 shrink-0"}>{message.date} </p> {/*Time*/}

                                </div>

                            </li>
                        ))}
                    </ul>


                </div>
                {/*footer*/}
                <div className="h-[10%] min-h-[50px] p-4 border-t-2 flex items-center" >
                    <div className="flex space-x-2  w-full">
                        {/*Input field for message*/}
                        <input
                            type="text"
                            placeholder="Enter your message"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            className="flex-1 border-2 p-2"
                        />

                        <button
                            className="border-2 px-4 py-2 hover:bg-black hover:text-white transition-all duration-400 "
                            onClick={() => {
                                addMessageToGroup(input);
                                setInput("");      // clear input
                            }}
                        >
                            <Send/>
                        </button>


                    </div>

                </div>

            </div>
        </>
    );
}
export default ChatPanel;
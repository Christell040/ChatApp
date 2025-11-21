import {Send, Users} from "lucide-react";
import {useState} from "react";

import Sidebar from "./Sidebar.tsx";
import ChatPanel from "./ChatPanel.tsx";
import {mockGroups} from "../data/mockGroups.ts";
import {mockMessages} from "../data/mockMessages.ts";
import {mockMembers} from "../data/mockMembers.ts";
import ManageGroup from "./ManageGroup.tsx";

// Interfaces required by system - User interface,message interface,group head interface
// Data to be mocked -Individual chats heads ,chat list heads
// State - Message Sending States




export default function ChatLayout() {
    // Importing Data Models
    const [groups, setGroups] = useState(mockGroups);
    const [messages, setMessages] = useState(mockMessages);
    const [members, setMembers] = useState(mockMembers);


    // SharedState for sidebar and chatpanel
    const [selectedGroup,setSelectedGroup] = useState(null);

    //To render the manage page for a group
    const [showManage, setShowManage] = useState(false);




    return (
        < >
            {/*Outercontainer*/}
            <div className=" h-screen grid grid-cols-[minmax(220px,300px)_minmax(300px,1fr)]">

                {/*ChatList*/}
                <Sidebar groups={groups} OnSelectGroup={(data)=>setSelectedGroup(data)}  />


                {/*<ChatPanel selectedGroup={selectedGroup} />*/}

                {showManage ? (
                    <ManageGroup
                        selectedGroup={selectedGroup}
                        groups={groups}
                        setGroups={setGroups}
                        members={members}
                        setMembers={setMembers}
                        onClose={() => setShowManage(false)}
                    />
                ) : (
                    <ChatPanel
                        selectedGroup={selectedGroup}
                        messages={messages}
                        setMessages={setMessages}
                        onManageGroup={() => setShowManage(true)}
                    />
                )}
            </div>


        </>


    );
}



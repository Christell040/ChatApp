// import {Send, Users} from "lucide-react";
import {useEffect, useState} from "react";

import Sidebar from "../Components/Sidebar.tsx";
import ChatPanel from "../Components/ChatPanel.tsx";
import {mockGroups} from "../data/mockGroups.ts";
import {mockMessages} from "../data/mockMessages.ts";
import {mockMembers} from "../data/mockMembers.ts";
import ManageGroup from "../Components/ManageGroup.tsx";
import {useLogin} from "../App.tsx";
import {useNavigate} from "react-router-dom";
import {getGroups} from "../Services/groupService.ts";
import type {Group} from "../types/types.ts";

// Interfaces required by system - User interface,message interface,group head interface
// Data to be mocked -Individual chats heads ,chat list heads
// State - Message Sending States




export default function ChatLayout() {

    const navigate = useNavigate();

    //User Context
    const {user} = useLogin();


    // Redirect if no user
    useEffect(() => {
        if (user.name=="") {
            navigate("/");
        }
    }, [user, navigate]);

    // Importing Data Models
    const [groups, setGroups] = useState<Group[]>(mockGroups);
    const [messages, setMessages] = useState(mockMessages);
    const [members, setMembers] = useState(mockMembers);

    const load = async () => {
        try {
            const data = await getGroups(user.email);
            setGroups(data);
        } catch (err) {
            console.error("Failed to load groups", err);
        }
    };

    const updateGroup = (group: Group) => {
        setGroups(prev => prev.concat(group));
    }

    console.log(user.email)

    useEffect(() => {
        if (user.email) load();
    }, []);


    // SharedState for sidebar and chatpanel
    const [selectedGroup,setSelectedGroup] = useState(null);

    //To render the manage page for a group
    const [showManage, setShowManage] = useState(false);

    return (
        < >
            {/*Outercontainer*/}
            <div className=" h-screen grid grid-cols-[minmax(220px,300px)_minmax(300px,1fr)]">

                {/*ChatList*/}
                <Sidebar
                    groups={groups}
                    OnSelectGroup={(data)=>setSelectedGroup(data)}
                    updateGroups = {(data)=>updateGroup(data)}
                />

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
                        onManageGroup={() => setShowManage(true)}
                    />
                )}
            </div>


        </>


    );
}



import SidebarHeader from "./SidebarHeader.tsx";
import NewGroupButton from "./NewGroupButton.tsx";

import {useState} from "react";
import {useLogin} from "../App.tsx";
import {createGroup, getGroups} from "../Services/groupService.ts";
import type {GroupRequest} from "../types/types.ts";

export default function Sidebar({groups,OnSelectGroup,updateGroups}) {
    //To trigger the create group modal
    const [isCreateGroup, setIsCreateGroup] = useState(false);

    const {user} = useLogin();

    //State Handlers For Group Form
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupType, setNewGroupType] = useState<"open"|"closed"|"private">("open");

    const [showBrowseGroups, setShowBrowseGroups] = useState(false);


    const handleCreateGroup = async (e) => {
        e.preventDefault();
        const newGroup : GroupRequest = {
            name: newGroupName,
            type: newGroupType,
            owner: user.email
        }

        const id = await createGroup(newGroup);

        updateGroups({
            groupID:id,
            ...newGroup
        });

        setIsCreateGroup(false);
    }

    return(
        <>
            {/*ChatList*/}
            <div className="flex flex-col w-full justify-between h-screen">

                {/* HEADER */}
                <SidebarHeader onBrowseGroups={() => setShowBrowseGroups(true)}/>

                {/* SCROLLABLE GROUP LIST */}
                <div className="flex-1 overflow-y-auto">
                    <ul className="space-y-0">
                        {groups.map((group) => (
                            <li
                                className="p-3 bg-white shadow border-2 border-r-0 border-l-0 hover:bg-gray-300 -mt-1"
                                key={group.groupId}
                                onClick={() => OnSelectGroup(group)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{group.name}</p>
                                    </div>
                                    <div className="w-6 h-6 flex items-center justify-center border text-sm font-medium">
                                        3
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FOOTER / BUTTON */}
                <NewGroupButton OnCreateGroup={()=>setIsCreateGroup(true)}/>
            </div>

            {/*//Will extend it to add users from scratch*/}
            {isCreateGroup && (
                <div
                    className="inset-0 z-50 fixed bg-black/50 flex items-center justify-center transition-all duration-700"
                    onClick={() => {setIsCreateGroup(false);}}
                >
                    <div
                        onClick={(e) => {e.stopPropagation()}}
                        className="flex flex-col border-2 w-100 p-10 z-50 bg-white"
                    >
                        <h2 className={"mb-4 font-medium"}>Create Group</h2>

                        <form
                            onSubmit={handleCreateGroup}
                            className={"space-y-4"}>

                            <div>
                                <label htmlFor="groupName" className={"block mb-1"}>Group Name:</label>
                                <input
                                    type="text"
                                    id="groupName"
                                    name="groupName"
                                    placeholder="Enter your group name"
                                    className="block w-full border-2 p-2"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="groupType" className="block mb-1">
                                    Group Type:
                                </label>

                                <select
                                    id="groupType"
                                    name="groupType"
                                    className="block w-full border-2 p-2"
                                    defaultValue="Open"
                                    value={newGroupType}
                                    onChange={(e) => setNewGroupType(e.target.value as any)}
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    className="text-sm font-medium text-gray-700 w-[48.5%] border-2 p-2
                                           hover:bg-black hover:text-white transition-all duration-700"
                                    onClick={()=>setIsCreateGroup(false)}>
                                    Cancel
                                </button>

                                <button
                                    className="text-sm font-medium text-gray-700 w-[48.5%] border-2 p-2
                                           hover:bg-black hover:text-white transition-all duration-700"
                                    type="submit"
                                >
                                    Create
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}


            {/*Browse Group Modal*/}
            {showBrowseGroups && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    onClick={() => setShowBrowseGroups(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-[80%] max-w-3xl h-[85%] rounded-lg shadow-xl flex flex-col"
                    >
                        {/* Top bar */}
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="text-lg font-semibold">Browse All Groups</h2>

                            <button
                                onClick={() => setShowBrowseGroups(false)}
                                className="border px-3 py-1 hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className="p-4 border-b">
                            <input
                                type="text"
                                placeholder="Search groups..."
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        {/* Scrollable groups area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">

                            {/* Dummy group card */}
                            {[1,2,3,4].map((i) => (
                                <div
                                    key={i}
                                    className="border p-4 rounded-lg shadow-sm bg-white"
                                >
                                    {/* Header row */}
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold">Design Team</p>

                                        {/* Label */}
                                        <span className="border px-2 py-1 text-sm rounded">
                                Open
                            </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600">
                                        UI/UX design discussions
                                    </p>

                                    {/* Members */}
                                    <p className="text-xs text-gray-500 mt-1">4 members</p>

                                    {/* Button aligned right */}
                                    <div className="flex justify-end mt-3">
                                        <button className="border px-3 py-1 text-sm hover:bg-gray-100">
                                            {i % 2 === 0
                                                ? "Request to Join"
                                                : "Joined"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer legend */}
                        <div className="border-t p-4 text-xs text-gray-600">
                            <p><strong>Group Status:</strong></p>
                            <ul className="list-disc ml-4 mt-1">
                                <li><strong>Open:</strong> Anyone can join instantly</li>
                                <li><strong>Closed:</strong> Requires approval from owner</li>
                                <li><strong>Private:</strong> Invite only</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

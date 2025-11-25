import SidebarHeader from "./SidebarHeader.tsx";
import NewGroupButton from "./NewGroupButton.tsx";


import {useState} from "react";
import {useLogin} from "../App.tsx";


export default function Sidebar({groups,OnSelectGroup,members}){

    const [createGroup, setCreateGroup] = useState(false);

    //Get user from context
    const {user} = useLogin();

    //Get Groups the user is a part of and renders

    //  All membership entries for this user
    const userMemberships = members.filter(
        (member) => member.memberEmail === user?.email
    );

    // Collect groupIds they belong to (fast lookup)
    const membershipSet = new Set(userMemberships.map(member => member.groupId));

    // Filter only groups they belong to
    const userGroups = groups.filter(group => membershipSet.has(group.id));


    //TODO:write a method for adding groups for the button
    return(
        <>
        {/*ChatList*/}
        <div className="flex flex-col w-full justify-between ">


            <div>
                {/*Header for chatside*/}
                <SidebarHeader />

                {/*List of chats*/}
                <ul className="space-y-0">
                    {/*Individual Group Head*/}

                    {userGroups.map((group) => (
                        <li
                            className="p-3 bg-white shadow border-2 border-r-0 border-l-0 hover:bg-gray-300  -mt-1 "
                            key={group.id}
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
            <NewGroupButton OnCreateGroup={()=>setCreateGroup(true)}/>

        </div>

            {createGroup && (
                // Overall dark overlay that gets cast
                <div
                    className="inset-0 z-50 fixed bg-black/50  flex items-center justify-center transition-all duration-700  "
                    onClick={() => {setCreateGroup(false);}}
                >
                    {/*Modal form itself*/}
                    <div
                        onClick={(e) => {e.stopPropagation()}}
                        className="flex flex-col border-2 w-100 p-10 z-50 bg-white "
                    >
                        <h2 className={"mb-4 font-medium"}>Create Group</h2>
                        <form className={"space-y-4"}>
                            <div>
                                <label htmlFor="groupName" className={"block mb-1"}>Group Name:</label>
                                <input
                                    type="text"
                                    id="groupName"
                                    name="groupName"
                                    placeholder="Enter your group name"
                                    className="block w-full border-2 p-2 "
                                />
                            </div>

                            {/* Dropdown Selector */}
                            <div>
                                <label htmlFor="groupType" className="block mb-1">
                                    Group Type:
                                </label>

                                <select
                                    id="groupType"
                                    name="groupType"
                                    className="block w-full border-2 p-2"
                                    defaultValue="Open" // sets initial value
                                >
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    className="text-sm font-medium text-gray-700  w-[48.5%] border-2 p-2
                                               hover:bg-black hover:text-white transition-all duration-700 "
                                    onClick={()=>setCreateGroup(false)}>
                                    Cancel
                                </button>

                                <button
                                    className="text-sm font-medium text-gray-700 w-[48.5%] border-2 p-2
                                               hover:bg-black hover:text-white transition-all duration-700 "
                                >
                                    Create
                                </button>

                            </div>
                        </form>

                    </div>



                </div>
            )}
        </>
    );
}

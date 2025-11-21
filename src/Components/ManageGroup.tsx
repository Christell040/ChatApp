import { useState, useEffect } from "react";
import { Circle, Crown, Trash2, X } from "lucide-react";

function ManageGroup({ selectedGroup, groups, setGroups, members, setMembers, onClose }) {

    // Local States For Form Field
    const [groupName, setGroupName] = useState("");
    const [owner, setOwner] = useState("");
    const [access, setAccess] = useState("");

    // Load initial values whenever selectedGroup changes
    useEffect(() => {
        if (selectedGroup) {
            setGroupName(selectedGroup.name);
            setOwner(selectedGroup.owner);
            setAccess(selectedGroup.access);
        }
    }, [selectedGroup]);



    // Save Changes
    const handleSave = () => {
        const updated = groups.map(group =>
            group.id === selectedGroup.id ? { ...group, name: groupName, owner, access } : group
        );

        setGroups(updated);
        alert("Changes saved!");
    };


    //For Removing Members
    const removeMember = (email) => {
        const groupId = selectedGroup.id;
        const groupMembers = members[groupId] || [];

        const filtered = groupMembers.filter(member => member !== email);

        setMembers({
            ...members,
            [groupId]: filtered
        });
    };


    // Delete a group
    const deleteGroup = () => {
        // remove from groups
        setGroups(groups.filter(group => group.id !== selectedGroup.id));

        // remove from members list
        const updatedMembers = { ...members };
        delete updatedMembers[selectedGroup.id];
        setMembers(updatedMembers);

        alert("Group deleted.");
        onClose();
    };


    // For Displaying Members
    const groupMembers = members[selectedGroup.id] || [];

    // put owner first always
    const otherMembers = groupMembers.filter(member => member !== selectedGroup.owner);


    return (
        <div className="flex flex-col w-full min-w-[300px] h-screen border-l-2">

            {/* Top Nav */}
            <div className="h-[10%] w-full flex items-center border-2">
                <div className="flex justify-center items-center gap-2 w-1/2">
                    <button
                        className="border-2 px-4 py-2 text-sm font-medium hover:text-white hover:bg-black"
                        onClick={onClose}
                    >
                        ← Back
                    </button>
                    <p className="font-medium text-lg">Manage Group</p>
                </div>
            </div>

            {/* Main */}
            <div className="h-[80%] flex flex-col w-full mt-4">
                <div className="flex gap-10 justify-center h-full">

                    {/* LEFT */}
                    <div className="flex flex-col justify-between">

                        {/* Settings */}
                        <div>
                            <h1 className="font-medium mb-4">Group Settings</h1>

                            <form className="w-80 border-2 space-y-3 p-4">
                                <div>
                                    <label className="block mb-1 text-sm">Group Name</label>
                                    <input
                                        type="text"
                                        className="block w-full border-2 p-2"
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm">Owner</label>
                                    <input
                                        type="text"
                                        className="block w-full border-2 p-2"
                                        value={owner}
                                        onChange={(e) => setOwner(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm block mb-1">Access</label>
                                    <select
                                        className="block w-full border-2 p-2"
                                        value={access}
                                        onChange={(e) => setAccess(e.target.value)}
                                    >
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    className="text-sm font-medium w-full border-2 p-2 hover:bg-black hover:text-white transition-all duration-700"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>

                        {/* Danger Zone */}
                        <div>
                            <h1 className="font-medium mb-4 text-red-600">Danger Zone</h1>

                            <div className="w-80 border-2 p-4 space-y-3">
                                <p>Delete this group permanently. This action cannot be undone.</p>

                                <button
                                    onClick={deleteGroup}
                                    className="flex justify-center items-center gap-1 text-sm font-medium w-full border-2 p-2 hover:bg-black hover:text-white transition-all duration-700"
                                >
                                    <Trash2 width={17} /> Delete Group
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="min-w-[250px] w-100 max-w-[600px]">
                        <h2 className="font-medium mb-4">
                            Current Members ({1 + otherMembers.length})
                        </h2>

                        <div>

                            {/* OWNER CARD */}
                            <div className="p-3 bg-white shadow border-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <Circle width={40} height={50} strokeWidth="1" fill="white" />
                                        <div>
                                            <p className="font-semibold">{owner}</p>
                                            <p className="flex items-center gap-1 text-xs">
                                                <Crown width="15" /> Owner
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="w-6 h-6 flex items-center justify-center border text-sm opacity-50 cursor-not-allowed"
                                    >
                                        <X width="15" />
                                    </button>
                                </div>
                            </div>

                            {/* OTHER MEMBERS */}
                            {otherMembers.map((member, index) => (
                                <div key={index} className="p-3 bg-white shadow border-2 border-t-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3 items-center">
                                            <Circle width={40} height={50} strokeWidth="1" fill="white" />
                                            <p className="font-semibold">{member}</p>
                                        </div>

                                        <button
                                            className="w-6 h-6 flex items-center justify-center border text-sm"
                                            onClick={() => removeMember(member)}
                                        >
                                            <X width="15" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ManageGroup;






// import {Circle, Crown, Trash2, X} from "lucide-react";
//
//
//
//
// function ManageGroup({selectedGroup,groups,setGroups,members,setMembers,onClose}) {
//
//     return (
//         <>
//             <div className="flex flex-col w-full min-w-[300px] h-screen border-l-2 ">
//
//                 {/* Top Nav */}
//                 <div className="h-[10%] w-full flex items-center border-2 ">
//                         <div className="flex  justify-center items-center gap-2 w-1/2">
//                             <button
//                                 className={"border-2 px-4 py-2 text-sm font-medium  hover:text-white hover:bg-black"}
//                                 onClick={onClose}
//                             >
//                                 ← Back
//                             </button>
//                             <p className="font-medium text-lg">Manage Group</p>
//                         </div>
//                 </div>
//
//                 {/* Main Content */}
//                 <div className="h-[80%] flex flex-col w-full mt-4">
//
//                     {/* Left + Right containers */}
//                     <div className="flex gap-10 justify-center h-full">
//
//                         {/* LEFT - GROUP SETTINGS + DANGER ZONE */}
//                         <div className={"flex flex-col justify-between  "}>
//                             <div>
//                                 <h1 className="font-medium mb-4">Group Settings</h1>
//
//                                 <form className="w-80 border-2 space-y-3 p-4">
//                                     <div>
//                                         <label
//                                             htmlFor="groupName"
//                                             className="block mb-1 text-sm"
//                                         >
//                                             Group Name
//                                         </label>
//                                         <input
//                                             id="groupName"
//                                             type="text"
//                                             className="block w-full border-2 p-2"
//                                         />
//                                     </div>
//
//                                     <div>
//                                         <label
//                                             htmlFor="owner"
//                                             className="block mb-1 text-sm"
//                                         >
//                                             Owner
//                                         </label>
//                                         <input
//                                             id="owner"
//                                             type="text"
//                                             className="block w-full border-2 p-2"
//                                         />
//                                     </div>
//
//                                     <div>
//                                         <label className="text-sm block mb-1">Access</label>
//                                         <select
//                                             id="groupType"
//                                             className="block w-full border-2 p-2"
//                                             defaultValue="Open"
//                                         >
//                                             <option value="Open">Open</option>
//                                             <option value="Closed">Closed</option>
//                                             <option value="Private">Private</option>
//                                         </select>
//                                     </div>
//
//                                     <button className="text-sm font-medium w-full border-2 p-2 hover:bg-black hover:text-white transition-all duration-700">
//                                         Save Changes
//                                     </button>
//                                 </form>
//                             </div>
//
//                             {/*Danger Zone*/}
//                             <div>
//                                 <h1 className="font-medium mb-4 text-red-600">Danger Zone</h1>
//
//                                 <div className="w-80 border-2 p-4 space-y-3">
//                                     <p className={"w-full break-words"}>Delete this group permanently.This action cannot
//                                         be undone
//                                     </p>
//
//                                     <button className="flex justify-center items-center gap-1 text-sm font-medium w-full border-2 p-2
//                                     hover:bg-black hover:text-white transition-all duration-700">
//                                         <Trash2 width={"17"}/> Delete Group
//                                     </button>
//
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* RIGHT - GROUP MEMBERS */}
//                         <div className="min-w-[250px] w-100 max-w-[600px]">
//                             <h2 className="font-medium mb-4">Current Members (4)</h2>
//
//                             <div>
//
//                                 {/* Owner card */}
//                                 <div className="p-3 bg-white shadow border-2">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex gap-3">
//                                             <Circle width={40} height={50} strokeWidth="1" fill="white" />
//                                             <div>
//                                                 <p className="font-semibold">Alice Johnson</p>
//                                                 <p className="flex items-center gap-1 text-xs">
//                                                     <Crown width="15" /> Owner
//                                                 </p>
//                                             </div>
//                                         </div>
//
//                                         <button className="w-6 h-6 flex items-center justify-center border text-sm">
//                                             <X width="15" />
//                                         </button>
//                                     </div>
//                                 </div>
//
//                                 <div className="p-3 bg-white shadow border-2 border-t-0">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex gap-3 items-center">
//                                             <Circle width={40} height={50} strokeWidth="1" fill="white" />
//                                             <p className="font-semibold">Christell Tawiah</p>
//
//                                         </div>
//
//                                         <button className="w-6 h-6 flex items-center justify-center border text-sm">
//                                             <X width="15" />
//                                         </button>
//                                     </div>
//                                 </div>
//
//
//
//                             </div>
//                         </div>
//
//                     </div>
//                 </div>
//
//             </div>
//         </>
//     );
// }
// export default ManageGroup;
//

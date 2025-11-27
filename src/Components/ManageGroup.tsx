import { useState, useEffect } from "react";
import { Circle, Crown, Trash2, X } from "lucide-react";
import type {editGroup, GroupMember, joinGroupRequest} from "../types/types.ts";
import { getGroupRequests, updateGroup} from "../Services/groupService.ts";
import { getMembers, removeMemberFromGroup } from "../Services/memberService.ts";
import toast from "react-hot-toast";

function ManageGroup({ selectedGroup, onClose }) {
    // Local States For Form Field
    const [groupName, setGroupName] = useState("");
    const [owner, setOwner] = useState("");
    const [access, setAccess] = useState("");

    // Members of THIS group
    const [members, setMembers] = useState<GroupMember[]>([]);

    // Mock: ALL users in system for accordion
    const allUsers = [
        { email: "user1@example.com", name: "User One" },
        { email: "user2@example.com", name: "User Two" }
    ];

    // Mock: Join Requests
    const [joinRequests,setJoinRequests] = useState<joinGroupRequest[]>([]);

    useEffect(()=>{
        const fetchRequests = async ()=>{
            const data = getGroupRequests(selectedGroup.groupID);
            setJoinRequests(data)
        }
    },[selectedGroup]);


    //For rendering users accordion
    const [showUsers, setShowUsers] = useState(false);

    //Load Members initially
    useEffect(() => {
        const fetchMembers = async () => {
            if (!selectedGroup) return;

            const data = await getMembers(selectedGroup.groupID);
            setMembers(data);
        };

        fetchMembers();
        toast.success("Members fetched successfully.");
    }, [selectedGroup]);

    // Load group info initially
    useEffect(() => {
        if (selectedGroup) {
            setGroupName(selectedGroup.groupName);
            setOwner(selectedGroup.owner);
            setAccess(selectedGroup.type);
        }
    }, [selectedGroup]);

    // Save Changes
    const handleSave = async () => {
        const editedGroup: editGroup = {
            type: access,
            groupID: selectedGroup.groupID,
            groupName: groupName,
        };

        await updateGroup(editedGroup);
        toast.success("Saved successfully.");
    };

    // Remove Member
    const removeMember = async (email: string) => {
        const removeRequest = {
            groupID: selectedGroup.groupID,
            userID: email,
            managerUserID: owner
        };

        await removeMemberFromGroup(removeRequest);

        const data = await getMembers(selectedGroup.groupID);
        setMembers(data);
    };

    // All except owner
    const otherMembers = members.filter(
        (member) => member.email !== selectedGroup.owner
    );

    return (
        <div className="flex flex-col w-full min-w-[300px] h-screen border-l-2">

            {/* Top Nav */}
            <div className="h-auto py-4 w-full flex flex-col md:flex-row items-center gap-3 border-b-2 px-4">
                <div className="flex justify-center items-center gap-2">
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
            <div className="h-[80%] flex flex-col w-full mt-4 ">
                <div className="flex flex-col md:flex-row gap-10 justify-center h-full px-4">

                    {/* LEFT */}
                    <div className="flex flex-col justify-between w-full md:w-auto">

                        {/* Settings */}
                        <div>
                            <h1 className="font-medium mb-4">Group Settings</h1>

                            <form className="w-full md:w-80 border-2 space-y-3 p-4">
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
                        <div className="mt-6 ">
                            <h1 className="font-medium mb-4 text-red-600">Danger Zone</h1>

                            <div className="w-full md:w-80 border-2 p-4 space-y-3">
                                <p>Delete this group permanently. This action cannot be undone.</p>

                                <button
                                    className="flex justify-center items-center gap-1 text-sm font-medium w-full border-2 p-2 hover:bg-black hover:text-white transition-all duration-700"
                                >
                                    <Trash2 width={17} /> Delete Group
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full md:min-w-[250px] md:max-w-[700px]">

                        {/* MEMBERS */}
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
                                            <p className="font-semibold">{member.email}</p>
                                        </div>

                                        <button
                                            className="w-6 h-6 flex items-center justify-center border text-sm"
                                            onClick={() => removeMember(member.email)}
                                        >
                                            <X width="15" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* ACCORDION — ALL USERS */}
                        <div className="mt-6">
                            <button
                                className="w-full text-left border p-2 font-medium"
                                onClick={() => setShowUsers(!showUsers)}
                            >
                                {showUsers ? " ↓ All Users" : "→ All Users"}
                            </button>

                            {showUsers && (
                                <div className="border border-t-0">
                                    {allUsers.map((user, index) => (
                                        <div key={index} className="p-3 bg-white shadow border-b">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-3 items-center">
                                                    <Circle width={40} height={50} strokeWidth="1" fill="white" />
                                                    <p className="font-semibold">{user.email}</p>
                                                </div>

                                                <button className="px-2 py-1 border text-sm">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* REQUEST TABLE */}
                <div className="mt-10 px-4 w-full ">
                    <h2 className="font-medium mb-3">Join Requests</h2>

                    <table className="w-full border-2 text-sm">
                        <thead>
                        <tr className="border bg-gray-100">
                            <th className="p-2 border">Requester</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {joinRequests.map((req, index) => (
                            <tr key={index} className="border">
                                <td className="p-2 border">{req.requesteruserID}</td>
                                <td className="p-2 border flex gap-2">
                                    <button className="px-2 py-1 border hover:bg-green-100">
                                        Accept
                                    </button>
                                    <button className="px-2 py-1 border hover:bg-red-100">
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ManageGroup;

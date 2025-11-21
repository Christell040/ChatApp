// TestLoginForm.tsx
import React, { useState } from "react";

const TestLoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="space-y-4 max-w-sm mx-auto">
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full border rounded-md p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full border rounded-md p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md"
            >
                Login
            </button>
        </form>
    );
};

export default TestLoginForm;

// }

// import { useState } from 'react';
// import { CreateGroupModal } from './CreateGroupModal';
// import { Send, Users } from 'lucide-react';
//
// interface ChatDashboardProps {
//     onManageMembers: () => void;
//     onManageUsers: () => void;
// }
//
// const mockChats = [
//     { id: 1, name: 'Design Team', preview: 'Latest design looks great!', unread: 3 },
//     { id: 2, name: 'Engineering', preview: 'Code review needed', unread: 0 },
//     { id: 3, name: 'Marketing', preview: 'Campaign launch next week', unread: 1 },
//     { id: 4, name: 'Product Team', preview: 'Roadmap discussion', unread: 0 },
// ];
//
// const mockMessages = [
//     { id: 1, sender: 'Alice', text: 'Hey everyone!', time: '10:30 AM' },
//     { id: 2, sender: 'Bob', text: 'How is the project going?', time: '10:32 AM' },
//     { id: 3, sender: 'Charlie', text: 'Making good progress', time: '10:35 AM' },
//     { id: 4, sender: 'Alice', text: 'Great to hear!', time: '10:36 AM' },
// ];
//
// export function ChatDashboard({ onManageMembers, onManageUsers }: ChatDashboardProps) {
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [selectedChat, setSelectedChat] = useState(mockChats[0]);
//
//     return (
//         <>
//             <div className="h-screen flex border-t-2 border-black">
//                 {/* Left Sidebar - Chat List */}
//                 <div className="w-80 border-r-2 border-black flex flex-col bg-white">
//                     {/* Header */}
//                     <div className="p-4 border-b-2 border-black">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2>Chats</h2>
//                             <button
//                                 onClick={onManageUsers}
//                                 className="border-2 border-black p-2 hover:bg-gray-50"
//                                 title="Manage Users"
//                             >
//                                 <Users className="w-4 h-4" strokeWidth={1} />
//                             </button>
//                         </div>
//
//                         {/* Search Bar */}
//                         <input
//                             type="text"
//                             className="w-full border-2 border-black px-3 py-2 bg-white"
//                             placeholder="Search..."
//                         />
//                     </div>
//
//                     {/* Chat List */}
//                     <div className="flex-1 overflow-y-auto">
//                         {mockChats.map((chat) => (
//                             <div
//                                 key={chat.id}
//                                 onClick={() => setSelectedChat(chat)}
//                                 className={`p-4 border-b-2 border-black cursor-pointer hover:bg-gray-50 ${
//                                     selectedChat.id === chat.id ? 'bg-gray-50' : ''
//                                 }`}
//                             >
//                                 <div className="flex justify-between items-start mb-1">
//                                     <span className="block">{chat.name}</span>
//                                     {chat.unread > 0 && (
//                                         <span className="border-2 border-black px-2 text-sm">
//                       {chat.unread}
//                     </span>
//                                     )}
//                                 </div>
//                                 <p className="text-sm text-gray-500">{chat.preview}</p>
//                             </div>
//                         ))}
//                     </div>
//
//                     {/* New Group Button */}
//                     <div className="p-4 border-t-2 border-black">
//                         <button
//                             onClick={() => setShowCreateModal(true)}
//                             className="w-full border-2 border-black px-4 py-2 bg-white hover:bg-gray-50"
//                         >
//                             + New Group
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Right Panel - Chat View */}
//                 <div className="flex-1 flex flex-col bg-white">
//                     {/* Chat Header */}
//                     <div className="p-4 border-b-2 border-black flex justify-between items-center">
//                         <div>
//                             <h3 className="mb-1">{selectedChat.name}</h3>
//                             <p className="text-sm text-gray-500">4 members</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={onManageMembers}
//                                 className="border-2 border-black px-4 py-2 hover:bg-gray-50"
//                             >
//                                 Manage
//                             </button>
//                             <button
//                                 onClick={onManageUsers}
//                                 className="border-2 border-black px-4 py-2 hover:bg-gray-50"
//                             >
//                                 <Users className="w-5 h-5" strokeWidth={1} />
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* Messages */}
//                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                         {mockMessages.map((message) => (
//                             <div key={message.id} className="border-2 border-black p-3 max-w-md">
//                                 <p className="text-sm mb-1">{message.sender}</p>
//                                 <p className="mb-2">{message.text}</p>
//                                 <p className="text-xs text-gray-500">{message.time}</p>
//                             </div>
//                         ))}
//                     </div>
//
//                     {/* Message Input */}
//                     <div className="p-4 border-t-2 border-black">
//                         <div className="flex gap-2">
//                             <input
//                                 type="text"
//                                 className="flex-1 border-2 border-black px-3 py-2 bg-white"
//                                 placeholder="Type a message..."
//                             />
//                             <button className="border-2 border-black px-4 py-2 bg-white hover:bg-gray-50">
//                                 <Send className="w-5 h-5" strokeWidth={1} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {showCreateModal && (
//                 <CreateGroupModal onClose={() => setShowCreateModal(false)} />
//             )}
//         </>
//     );
// }

import { useState } from "react";
import { mockUsers } from "../data/mockUsers";
import { Pencil, X } from "lucide-react";


export default function ManageUsers() {
    const [users, setUsers] = useState(mockUsers);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        admin: "",
    });

    const [editUser, setEditUser] = useState<any>(null);

    // ADD USER
    function handleAddUser() {
        if (
            !newUser.name.trim() ||
            !newUser.email.trim() ||
            !newUser.password.trim() ||
            !newUser.admin.trim()
        ) {
            alert("All fields required");
            return;
        }

        const toAdd = { ...newUser, status: true };
        setUsers([...users, toAdd]);

        setNewUser({
            name: "",
            email: "",
            password: "",
            role: "user",
            admin: "",
        });

        setShowAddModal(false);
    }

    // SAVE EDIT
    function handleEditSave() {
        const updated = users.map((u) =>
            u.email === editUser.email ? editUser : u
        );

        setUsers(updated);
        setShowEditModal(false);
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Manage Users</h1>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="border-2 border-black px-4 py-2 "
                >
                    + Add User
                </button>
            </div>

            {/* TABLE */}
            <table className="w-full border-2 border-black border-collapse">
                <thead>
                <tr className="border border-black">
                    <th className="p-2 border-2 border-black text-left">Name</th>
                    <th className="p-2 border-2 border-black text-left">Email</th>
                    <th className="p-2 border-2 border-black text-left">Role</th>
                    <th className="p-2 border-2 border-black text-left">Status</th>
                    <th className="p-2 border-2 border-black text-left">Action</th>
                </tr>
                </thead>

                <tbody>
                {users.map((u) => (
                    <tr key={u.email} className="border border-black">
                        <td className="p-2 border-2 border-black">{u.name}</td>
                        <td className="p-2 border-2 border-black">{u.email}</td>
                        <td className="p-2 border-2 border-black capitalize">{u.role}</td>
                        <td className="p-2 border-2 border-black">
                            {u.status ? "Active" : "Inactive"}
                        </td>
                        <td className="p-2 border-2 border-black">
                            <button
                                className="border border-black p-2 flex items-center gap-1"
                                onClick={() => {
                                    setEditUser({ ...u });
                                    setShowEditModal(true);
                                }}
                            >
                                <Pencil size={14} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* ------------------------------------------------------ */}
            {/* ADD USER MODAL */}
            {/* ------------------------------------------------------ */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                    <div className="bg-white border border-black p-6  w-[350px]">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-medium">Add User</h2>
                            <X
                                onClick={() => setShowAddModal(false)}
                                className="cursor-pointer"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({ ...newUser, name: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({ ...newUser, email: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({ ...newUser, password: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        />

                        <select
                            value={newUser.role}
                            onChange={(e) =>
                                setNewUser({ ...newUser, role: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Admin email"
                            value={newUser.admin}
                            onChange={(e) =>
                                setNewUser({ ...newUser, admin: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-4"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="border border-black px-4 py-2 "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleAddUser}
                                className="border border-black px-4 py-2 "
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* EDIT USER MODAL */}
            {/* ------------------------------------------------------ */}
            {showEditModal && editUser && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                    <div className="bg-white border-2 border-black p-6  w-[350px]">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-medium">Edit User</h2>
                            <X
                                onClick={() => setShowEditModal(false)}
                                className="cursor-pointer"
                            />
                        </div>

                        <input
                            type="text"
                            value={editUser.name}
                            onChange={(e) =>
                                setEditUser({ ...editUser, name: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        />

                        <input
                            type="email"
                            value={editUser.email}
                            onChange={(e) =>
                                setEditUser({ ...editUser, email: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        />

                        <select
                            value={editUser.role}
                            onChange={(e) =>
                                setEditUser({ ...editUser, role: e.target.value })
                            }
                            className="w-full border border-black p-2  mb-3"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <select
                            value={editUser.status ? "active" : "inactive"}
                            onChange={(e) =>
                                setEditUser({
                                    ...editUser,
                                    status: e.target.value === "active",
                                })
                            }
                            className="w-full border border-black p-2  mb-4"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="border border-black px-4 py-2 "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleEditSave}
                                className="border border-black px-4 py-2 "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

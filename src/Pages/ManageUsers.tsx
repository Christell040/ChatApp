import {useEffect, useState} from "react";
import { Pencil, X } from "lucide-react";
import type {User, UserCreation} from "../types/types.ts"
import {deleteUser, getUsers, updateUser} from "../Services/userService.ts";
import { createUser } from "../Services/userService";
import {useNavigate} from "react-router-dom";

// TODO - Integrate Edits
// TODO - Integrate Delete User

export default function ManageUsers({admin}) {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(admin.email == ""){
            navigate("/admin");
        }
    },[admin])

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (e) {
            console.error("Failed to fetch users", e);
    };}

    useEffect(() => {
        loadUsers();
    }, []);


    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [newUser, setNewUser] = useState({
        name: "",
        userID: "",
        password: "",
        role: 0,
        admin: admin.email,
    });

    const [editUser, setEditUser] = useState<any>(null);
    const [emailToDelete, setEmailToDelete] = useState<string>("");

    // ADD USER
    async function handleAddUser() {
        if (
            !newUser.name.trim() ||
            !newUser.userID.trim() ||
            !newUser.password.trim() ||
            !newUser.admin.trim()
        ) {
            alert("All fields required");
            return;
        }

        try {
            const newUserObj : UserCreation = {
                name: newUser.name,
                userID: newUser.userID,
                password: newUser.password,
                admin: newUser.admin,
                role: newUser.role,
            };

            const created = await createUser(newUserObj);
        } catch(error){
            console.error("Failed to create user", error);
        }
        loadUsers();

        setNewUser({
            name: "",
            userID: "",
            password: "",
            role: 0,
            admin: admin.email,
        });

        setShowAddModal(false);
    }

    // EDIT USER
    async function handleEditSave() {
        if (
            !editUser.name.trim() ||
            !editUser.email.trim() ||
            !editUser.password.trim() ||
            !editUser.admin.trim()
        ) {
            alert("All fields required");
            return;
        }

        try{
            const editedUser={
                name: editUser.name,
                email: editUser.email,
                password: editUser.password,
                admin: editUser.admin,
                role: editUser.role,
            };
            const edited = await updateUser(editedUser);

            loadUsers();
        }catch(error){
            console.error("Failed to edit user", error);
        }

        setShowEditModal(false);
    }

    // DELETE USER
    async function handleDelete(email: string) {
        try {
            const deleted = await deleteUser(email);

            if (deleted) {
                loadUsers();
            } else {
                alert("User not found");
            }
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    }

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Manage Users</h1>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-200 "
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
                        <td className="p-2 border-b flex space-x-2">

                            {/* EDIT BUTTON */}
                            <button
                                className=" cursor-pointer border border-black p-2 hover:bg-black hover:text-white transition-all duration-200"
                                onClick={() => {
                                    setEditUser({ ...u });
                                    setShowEditModal(true);
                                }}
                            >
                                <Pencil size={14} />
                            </button>

                            {/* DELETE BUTTON (opens modal) */}
                            <button
                                className="border border-black p-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
                                onClick={()=>{
                                    setEmailToDelete(u.email);
                                    setShowDeleteModal(true);   // NEW
                                }}
                            >
                                <X size={14} />
                            </button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/*/!*Delete confirmation modal+/}*/}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                    <div className="bg-white border border-black p-6 w-[350px]">

                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-medium">Confirm Delete</h2>
                            <X
                                onClick={() => setShowDeleteModal(false)}
                                className="cursor-pointer"
                            />
                        </div>

                        <p className="mb-6">
                            Are you sure you want to delete <b>{emailToDelete}</b>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    handleDelete(emailToDelete);
                                    setShowDeleteModal(false);
                                }}
                                className="border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD USER MODAL */}
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
                            value={newUser.userID}
                            onChange={(e) =>
                                setNewUser({ ...newUser, userID: e.target.value })
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
                                setNewUser({ ...newUser, role: Number(e.target.value) })
                            }
                            className="w-full border border-black p-2 mb-3"
                        >
                            <option value={0}>User</option>
                            <option value={1}>Manager</option>
                            <option value={2}>Admin</option>
                        </select>


                        <input
                            disabled
                            type="text"
                            placeholder={admin.email}
                            value={admin.email} //Because the backend returns email but takes ID
                            className="w-full border border-black p-2  mb-4 text-blue-800"
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

            {/* EDIT USER MODAL */}
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
                            disabled={editUser.email}
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
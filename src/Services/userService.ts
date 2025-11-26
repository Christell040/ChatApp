import {api} from "../Services/axios.ts"
import type {User, UserRequest} from "../types/types.ts"

//Get-Methods

//getAllUsers
export async function getUsers():Promise<User[]> {
    const response = await api.get("/users")
    return response.data
}

//getUserByEmail
export async function getUserByEmail(email: string): Promise<User> {
    const response = await api.get("/users/search", {
        params: { email }
    });
    return response.data;
}

//Post-Methods
// createUser
export async function createUser(data: UserRequest): Promise<User> {
    const response = await api.post("/users/createUser", data);
    return response.data;
}

//Update User
export async function updateUser(data: UserRequest): Promise<User> {
    const response = await api.patch("/users/updateUser", data);
    return response.data;
}

// deleteMethods
// delete user
// // @DeleteMapping("/deleteUser/{email}")
// export async function deleteUser(email: string): Promise<User> {
//     const response = await api.delete(`/deleteUser/${email}`);
//     return response.data;
// }

export async function deleteUser(email: string): Promise<boolean> {
    try {
        await api.delete(`/users/deleteUser/${email}`);
        return true; // got 204 success
    } catch (err:any) {
        if (err.response && err.response.status === 404) {
            return false; // not found
        }
        throw err; // some other error
    }
}






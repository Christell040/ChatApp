import {api} from "../Services/axios.ts"
import type {LoginRequest, User, UserCreation, UserRequest} from "../types/types.ts"

// userLogin
export async function login(data: LoginRequest) {
    try {
        const res = await api.post("/login", data);
        return res.status;
    } catch (err: any) {
        if (err.response?.status === 401) {
            return 401;
        }
        throw err;
    }
}


//getAllUsers
export async function getUsers():Promise<User[]> {
    const response = await api.get("/getAllUsers")
    return response.data
}

//getUserByEmail
export async function getUserByEmail(userID: string): Promise<User> {
    const response = await api.get("/getUser", {
        params: { userID }
    });
    return response.data;
}

//Post-Methods
// createUser
export async function createUser(data: UserCreation){
    const response = await api.post("/createUser", data);
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






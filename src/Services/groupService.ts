// src/Services/groupService.ts
import { api } from "./axios";
import type {Group, GroupRequest} from "../types/types";


//A method to create a group - Returns a status
export async function createGroup(data:GroupRequest){
    const res = await api.post("/createGroup",data);
    return res.data;
}

//A method to fetch gorups - returns a list of groups that a user belongs to
export async function getGroups(userID: string): Promise<Group[]> {
    const res = await api.get("/getGroupchats", {
        params: { userID }
    });
    return res.data;
}

//Need to write this method in the DB
export async function updateGroup(data: Group): Promise<Group> {
    const res = await api.patch("/groups/update", data);
    return res.data;
}

// Need to write this method in the db
export async function deleteGroup(groupId: number): Promise<void> {
    await api.delete(`/groups/${groupId}`); // adjust path (eg. `/groups/delete/${id}`)
}

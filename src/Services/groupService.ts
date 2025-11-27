// src/Services/groupService.ts
import { api } from "./axios";
import type {addToGroupRequest, editGroup, Group, GroupRequest, joinGroupRequest, requestToJoin} from "../types/types";


//A method to create a group - Returns a status
export async function createGroup(data:GroupRequest){
    const res = await api.post("/createGroup",data);
    return res.data;
}

//Method to fetch all Groups
export async function getAllGroups(): Promise<Group[]>{
    const res  =  await api.get("/getAllGroups");
    return res.data;
}

//A method to fetch gorups - returns a list of groups that a user belongs to
export async function getGroups(userID: string): Promise<Group[]> {
    const res = await api.get("/getChats", {
        params: { userID }
    });
    return res.data;
}

//Method to get a single group
export async function getGroup(groupID: string) {
    const res = await api.post("/getChat", {
        params: { groupID }
    })
    return res.data;
}

// Method to edit a group
export async function updateGroup(data: editGroup){
    const res = await api.post("/editGroup", data);
    return res.data;
}

//Method to add someone to a group
export async function requestOpenGroup(data:addToGroupRequest){
    const res = await api.post("/addToGroup", data);
    return res.data;
}

//Method to request to join a group
export async function requestToJoinGroup(data: requestToJoin){
    const res = await api.post("/requestToJoinGroup", data);
    return res.data;
}

//Function to get all group requests
export async function getGroupRequests(groupID:string):Promise<joinGroupRequest[]>{
    const res = await api.post("/getGroupRequests", {
        params: { groupID }
    })
    return res.data;
}


// Need to write this method in the db
export async function deleteGroup(groupId: number): Promise<void> {
    await api.delete(`/groups/${groupId}`); // adjust path (eg. `/groups/delete/${id}`)
}

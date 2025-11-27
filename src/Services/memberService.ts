// src/Services/memberService.ts
import { api } from "./axios";
import type {removeMemberRequest} from "../types/types.ts";

export async function getMembers(groupID:string){
    const res = await api.get("/getMemmbersOfGroup",{
        params: {groupID}
    });
    return res.data;
}

export async function removeMemberFromGroup(data:removeMemberRequest) {
   const res =  await api.post("/removeMemberFromGroup", data);
   return res.data;
}

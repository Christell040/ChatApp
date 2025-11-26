// src/Services/memberService.ts
import { api } from "./axios";
import type { Member } from "../types/types";

export async function getMembers(groupId:string): Promise<Member[]> {
    const res = await api.get(`/groupMembers/${groupId}`);
    return res.data;
}

export async function removeMember(groupId: number, email: string): Promise<void> {
    await api.delete("/groupMembers/deleteMember", {
        params: { groupId, email },
    });
}

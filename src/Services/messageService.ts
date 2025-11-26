//Function to get messages

import type {Message, MessageRequest} from "../types/types.ts";
import {api} from "./axios.ts";

export async function getChatMessages(groupID: string): Promise<Message[]> {
    const response = await api.get("/getMessages",{
        params: {groupID}
    });
    return response.data;
}

export async function sendMessage(message: MessageRequest){
    const response = await api.post("/sendMessage",message);
    return response.data;
}


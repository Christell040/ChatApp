
export type Message = {
    id: number;
    groupId: number;
    senderEmail: string;
    message: string;
    dateTime: string;
}


export type ChatHeader = {
    id: number;
    groupName: string;
    messageCountBadge: number;
    messagePreview: string;
}

export type User ={
    name: string;
    email: string;
    password: string;
    role: string;
    status: boolean;
    admin: string;
}

export type Group = {
    groupId: number;
    name: string;
    access:string;
    owner:string;
}

export type Member = {
    groupId: number;
    memberEmail: string;
}

export type UserRequest = {
    name: string;
    email: string;
    password: string;
    role: string;
    admin: string;
}

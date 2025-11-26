
export type Message = {
    messageID: string;
    sender: string;
    message: string;
    group: string;
    messageStatus:"active" | "inactive";
    timeUTC: string;
}

export type MessageRequest = {
    sender: string;
    message: string;
    groupID: string;
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
    groupID: number;
    name: string;
    type:"open"|"closed" |"private";
    owner:string;
}
export type GroupRequest = {
    name: string;
    type:"open"|"closed"|"private";
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

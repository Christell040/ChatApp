
export type LoginRequest = {
    email: string
    password: string
}

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

export type UserCreation={
    userID: string,
    admin:string,
    password: string,
    name: string,
    role:number
}

export type User ={
    email: string;
    name: string;
    password: string;
    role: number;
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

export type editGroup={
    groupID: string;
    groupName: string;
    type: string;
}

export type removeMemberRequest = {
    groupID: string;
    userID: string;
    managerUserID: string;
}

export type GroupMember = {
    email: string;
    name: string;
    role: string;
    status: string;
};

export type addToGroupRequest = {
    owner: string;
    userToAdd: string;
    groupID: string;
}

export type requestToJoin = {
    groupID: string;
    requesteruserID: string;
}

export type joinGroupRequest = {
    requestID: string;
    userID: string;
    groupName: string;
    groupID: string;
    status :string;
}


export type Message = {
    id: number;
    groupId: number;
    senderEmail: string;
    message: string;
    date: string;
}

export type ChatHeader = {
    id: number;
    groupName: string;
    messageCountBadge: number;
    messagePreview: string;
}
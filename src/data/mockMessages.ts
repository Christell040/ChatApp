// export const mockMessages = [
//     { id: 1, groupId: 1, sender: "sam@example.com", text: "Hello team!" ,date: "2025-01-04T10:24:30"},
//     { id: 2, groupId: 1, sender: "lisa@example.com", text: "Hey Sam!",date: "2025-01-04T10:24:30" },
//
//     { id: 3, groupId: 2, sender: "backend@example.com", text: "DB migrations done." ,date: "2025-01-04T10:24:30"}
// ];

// Messages in each group
export const mockMessages = [
    // Group 1: Frontend Devs
    { id: 1, groupId: 1, sender: "sam@example.com", text: "Hello team!", date: "2025-01-04T10:24:30" },
    { id: 2, groupId: 1, sender: "lisa@example.com", text: "Hey Sam! How's it going?", date: "2025-01-04T10:25:00" },
    { id: 3, groupId: 1, sender: "christell@example.com", text: "Don't forget the code review today.", date: "2025-01-04T10:26:00" },

    // Group 2: Backend Wizards
    { id: 4, groupId: 2, sender: "backend@example.com", text: "DB migrations done.", date: "2025-01-04T11:00:00" },
    { id: 5, groupId: 2, sender: "christell@example.com", text: "Great job, team!", date: "2025-01-04T11:01:00" },

    // Group 3: UI/UX Team
    { id: 6, groupId: 3, sender: "design@example.com", text: "New mockups are ready.", date: "2025-01-04T12:00:00" },
    { id: 7, groupId: 3, sender: "christell@example.com", text: "Looks amazing! Let's review them.", date: "2025-01-04T12:05:00" },

    // Group 4: DevOps Team
    { id: 8, groupId: 4, sender: "devops@example.com", text: "Servers updated and deployed.", date: "2025-01-04T13:00:00" },
    { id: 9, groupId: 4, sender: "christell@example.com", text: "Excellent work!", date: "2025-01-04T13:05:00" }
];

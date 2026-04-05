// src/data/data.ts

// User data for chat and profile
export const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user1.jpg",
    status: "online",
    lastSeen: "2024-03-18T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/avatars/user2.jpg",
    status: "offline",
    lastSeen: "2024-03-18T09:15:00Z"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/avatars/user3.jpg",
    status: "online",
    lastSeen: "2024-03-18T11:00:00Z"
  }
];

// Chat messages data
export const chatMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    message: "Hello, I need help with my account",
    timestamp: "2024-03-18T10:30:00Z",
    read: true
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    message: "Sure, I can help you. What's the issue?",
    timestamp: "2024-03-18T10:31:00Z",
    read: true
  }
];

// Support tickets data
export const supportTickets = [
  {
    id: "TICKET-001",
    userId: 1,
    subject: "Withdrawal issue",
    status: "open",
    priority: "high",
    createdAt: "2024-03-18T09:00:00Z"
  },
  {
    id: "TICKET-002",
    userId: 2,
    subject: "Account verification",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-03-18T08:30:00Z"
  }
];

// Export all data
export default {
  userData,
  chatMessages,
  supportTickets
};
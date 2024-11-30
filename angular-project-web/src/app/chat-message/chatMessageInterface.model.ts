export interface ChatMessageItem {
    _id : string;
    role: string;          // The role of the message sender (e.g., "user", "assistant")
    content: string;      // The HTML content of the message
    }
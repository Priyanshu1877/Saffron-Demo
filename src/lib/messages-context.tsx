import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface Message {
    id: string;
    user: string;
    email: string;
    subject: string;
    content: string;
    date: string;
    status: "New" | "Read" | "Replied";
}

interface MessagesContextType {
    messages: Message[];
    addMessage: (message: Omit<Message, "id" | "date" | "status">) => void;
    updateMessageStatus: (id: string, status: Message["status"]) => void;
    deleteMessage: (id: string) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        user: "Alice Johnson",
        email: "alice@example.com",
        subject: "Question about shipping",
        content: "Hi, do you ship to Canada? If so, how long does it usually take?",
        date: "2023-11-15T10:30:00",
        status: "New"
    },
    {
        id: "2",
        user: "Robert Smith",
        email: "robert@example.com",
        subject: "Bulk order inquiry",
        content: "I'm interested in buying 50 boxes of the gift set. Do you offer wholesale pricing?",
        date: "2023-11-14T15:45:00",
        status: "Replied"
    },
    {
        id: "3",
        user: "Emily Chen",
        email: "emily@example.com",
        subject: "Product authenticity",
        content: "Hello, can you provide the certificate of analysis for the current batch of saffron threads?",
        date: "2023-11-13T09:15:00",
        status: "Read"
    }
];

export function MessagesProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const storedMessages = localStorage.getItem("messages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
            setMessages(INITIAL_MESSAGES);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    }, [messages]);

    const addMessage = (message: Omit<Message, "id" | "date" | "status">) => {
        const newMessage: Message = {
            ...message,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: "New"
        };
        setMessages((prev) => [newMessage, ...prev]);
        toast.success("Message sent successfully");
    };

    const updateMessageStatus = (id: string, status: Message["status"]) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
    };

    const deleteMessage = (id: string) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        toast.success("Message deleted");
    };

    return (
        <MessagesContext.Provider value={{ messages, addMessage, updateMessageStatus, deleteMessage }}>
            {children}
        </MessagesContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessagesContext);
    if (context === undefined) {
        throw new Error("useMessages must be used within a MessagesProvider");
    }
    return context;
}

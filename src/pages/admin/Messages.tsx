import { useState } from "react";
import { Search, MessageSquare, Reply, User } from "lucide-react";
import { toast } from "sonner";
import { useMessages, Message } from "@/lib/messages-context";

export default function AdminMessages() {
    const { messages, updateMessageStatus } = useMessages();
    const [searchQuery, setSearchQuery] = useState("");
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState("");

    const filteredMessages = messages.filter(m =>
        m.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReply = (message: Message) => {
        setReplyingTo(message);
        setReplyText("");
        if (message.status === "New") {
            updateMessageStatus(message.id, "Read");
        }
    };

    const sendReply = () => {
        if (!replyingTo) return;

        // Update message status
        updateMessageStatus(replyingTo.id, "Replied");

        toast.success(`Reply sent to ${replyingTo.user}`);
        setReplyingTo(null);
    };

    return (
        <div className="space-y-6">
            <h1 className="font-display text-2xl font-semibold text-foreground">Messages & Support</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
                {/* Message List */}
                <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-border flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full bg-secondary/50 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredMessages.map(message => (
                            <button
                                key={message.id}
                                onClick={() => handleReply(message)}
                                className={`w-full text-left p-4 border-b border-border hover:bg-secondary/50 transition-colors ${replyingTo?.id === message.id ? "bg-secondary/50" : ""
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-medium text-sm ${message.status === "New" ? "text-foreground" : "text-muted-foreground"}`}>
                                        {message.user}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                        {new Date(message.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-foreground truncate">{message.subject}</p>
                                <p className="text-xs text-muted-foreground truncate mt-1">{message.content}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    {message.status === "New" && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-medium">New</span>
                                    )}
                                    {message.status === "Replied" && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">Replied</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message Detail & Reply */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-border flex flex-col overflow-hidden">
                    {replyingTo ? (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-border bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-foreground">{replyingTo.user}</h2>
                                            <p className="text-sm text-muted-foreground">{replyingTo.email}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{new Date(replyingTo.date).toLocaleString()}</span>
                                </div>
                                <h3 className="font-medium text-lg mb-2">{replyingTo.subject}</h3>
                                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{replyingTo.content}</p>
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                    <Reply size={16} />
                                    Reply to {replyingTo.user.split(' ')[0]}
                                </label>
                                <textarea
                                    className="flex-1 w-full border border-border rounded-lg p-4 resize-none focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Type your reply here..."
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={sendReply}
                                        disabled={!replyText.trim()}
                                        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                            <MessageSquare size={48} className="mb-4 opacity-20" />
                            <p>Select a message to view details and reply</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

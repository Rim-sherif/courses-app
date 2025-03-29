import React, { useState } from 'react';
import JitsiMeetComponent from './StreamingComponent';

const LiveStream = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { text: message, user: 'You', time: new Date().toLocaleTimeString() }]);
            setMessage('');
        }
    };

    return (
        <div className="p-4 h-screen bg-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
                {/* Main Stream Section */}
                <div className="lg:col-span-3 space-y-4">
                    {/* <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
                        <i className="fas fa-video text-4xl text-gray-500"></i>
                    </div> */}

                    <JitsiMeetComponent roomName="Course-Live-123" userName="Course Streaming" />

                    
                    {/* Stream Info */}
                    {/* <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-2">Live Stream Title</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <i className="fas fa-eye"></i> 0 viewers
                            </span>
                            <span className="flex items-center gap-1">
                                <i className="fas fa-clock"></i> 00:00:00
                            </span>
                        </div>
                    </div> */}

                    {/* Stream Controls */}
                    {/* <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex gap-4 justify-center">
                            <button className="p-3 rounded-full bg-red-700 text-white hover:bg-red-600">
                                <i className="fas fa-video"></i>
                            </button>
                            <button className="p-3 rounded-full bg-gray-500 text-white hover:bg-gray-600">
                                <i className="fas fa-microphone"></i>
                            </button>
                            <button className="p-3 rounded-full bg-gray-500 text-white hover:bg-gray-600">
                                <i className="fas fa-desktop"></i>
                            </button>
                            <button className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600">
                                End Stream
                            </button>
                        </div>
                    </div> */}
                </div>

                {/* Chat Section */}
                <div className="bg-white rounded-lg shadow h-full flex flex-col">
                    <div className="p-4 border-b">
                        <h3 className="font-bold">Live Chat</h3>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{msg.user}</span>
                                    <span>{msg.time}</span>
                                </div>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#410445] text-white rounded hover:bg-[#372139]"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LiveStream;

import React, { useState } from 'react';
import './ChatBot.css'

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    

    async function handleSendMessage() {
        try {
            //const response = await post('ChatBot', userInput);
            const response = await fetch('http://localhost:5000/ChatBot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include any request body if needed
                body: JSON.stringify(userInput),
            });

            const data = await response.json();
            console.log(data.answer);
            setChatResponse(data.answer);
        } catch (error) {
            //console.error('Error sending message:', error);
            console.log(error);
            setChatResponse('Error communicating with the server.');
        }
    }

    return (
        <div className="left">
            <div>


            </div>

            <div className="left">
                <strong>You:</strong> {userInput}
            </div>
            <div className="left">
                <strong>ChatBot:</strong> {chatResponse}
            </div>
            <div className="left">
                <input type="text" value={userInput} onChange={handleUserInput} />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;

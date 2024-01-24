import { useEffect, useState } from 'react';
import './App.css';
import ChatBot from './ChatBot.jsx';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>ChatGPT Chatbot</h1>
                <ChatBot />
            </header>
        </div>
    );
}

export default App;
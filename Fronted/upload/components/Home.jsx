import '../Css/Home.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/');

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server with id:', socket.id);
    });

    socket.on('messages', (message) => {
      console.log('Server Side Message', message);
      if (socket.id !== message.client_id) {
        setMessages((prev) => [...prev, message.message]);
      }
    });

  }, []);

  function clickMe() {
    socket.emit('user-message', input);
    setInput('');
  }

  return (
    <div>
      <h3>Chat Application</h3>
      <div className="Messages">
        <ul>
          {messages.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <textarea
        className="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <button className="send" onClick={clickMe}>
        Send
      </button>
    </div>
  );
}

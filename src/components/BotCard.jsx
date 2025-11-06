import React, { useState } from 'react';
import { socket } from '../socket';

export default function BotCard({ bot }) {
  const [msg, setMsg] = useState('');

  const sendMessage = () => {
    socket.emit('sendChat', { bot: bot.name, message: msg });
    setMsg('');
  };

  return (
    <div style={{
      border: '1px solid gray',
      borderRadius: 8,
      padding: 10,
      margin: 10,
      width: 200
    }}>
      <h3>{bot.name}</h3>
      <p>Status: <b style={{ color: bot.status === 'online' ? 'green' : 'red' }}>{bot.status}</b></p>
      <p><small>{bot.host}</small></p>

      <input
        placeholder="Send chat"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

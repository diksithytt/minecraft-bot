import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import BotCard from './components/BotCard';

export default function App() {
  const [bots, setBots] = useState([]);
  const [newBot, setNewBot] = useState({ name: '', host: '' });

  useEffect(() => {
    fetch('http://localhost:4000/bots')
      .then(res => res.json())
      .then(setBots);

    socket.on('botStatus', (data) => {
      setBots((prev) => {
        const updated = prev.filter((b) => b.name !== data.name);
        return [...updated, data];
      });
    });

    socket.on('chatMessage', (data) => {
      console.log(`[${data.bot}] ${data.username}: ${data.message}`);
    });
  }, []);

  const addBot = async () => {
    if (!newBot.name || !newBot.host) return alert('Fill all fields');
    await fetch('http://localhost:4000/add-bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBot),
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Minecraft Bot Dashboard</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Bot Name"
          value={newBot.name}
          onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Server IP"
          value={newBot.host}
          onChange={(e) => setNewBot({ ...newBot, host: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <button onClick={addBot}>Add Bot</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {bots.map((bot) => (
          <BotCard key={bot.name} bot={bot} />
        ))}
      </div>
    </div>
  );
}

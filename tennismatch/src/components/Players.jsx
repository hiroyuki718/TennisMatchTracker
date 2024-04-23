import React, { useState, useEffect } from 'react';

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/players'); // Adjusted URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Could not fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Players</h1>
      <p>Here's a list of users registered on our platform.</p>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.username} - {player.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;

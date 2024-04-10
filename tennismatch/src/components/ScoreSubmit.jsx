import React, { useState } from 'react';

const ScoreSubmit = () => {
  const [formData, setFormData] = useState({
    playerId: '',
    matchId: '',
    score: ''
  });

  const { playerId, matchId, score } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerId, matchId, score })
      });

      if (!response.ok) {
        throw new Error('Failed to submit score');
      }

      const result = await response.json();
      console.log(result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error submitting score:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="playerId">Player ID:</label>
      <input type="text" id="playerId" name="playerId" value={playerId} onChange={onChange} required />

      <label htmlFor="matchId">Match ID:</label>
      <input type="text" id="matchId" name="matchId" value={matchId} onChange={onChange} required />

      <label htmlFor="score">Score:</label>
      <input type="text" id="score" name="score" value={score} onChange={onChange} required />

      <button type="submit">Submit Score</button>
    </form>
  );
};

export default ScoreSubmit;
import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/players');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const text = await response.text(); // First get text
        try {
          const data = JSON.parse(text); // Then try to parse it
          console.log(data); // Check the fetched data
          setUsers(data);
        } catch (err) {
          console.error('Failed to parse JSON:', text);
          throw err;
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/players/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Admin - User Management</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
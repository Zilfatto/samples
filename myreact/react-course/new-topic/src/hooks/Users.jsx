import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Fetching data with hooks
function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const result = await axios('https://jsonplaceholder.typicode.com/users');
      setUsers(result.data);
    }
    getUsers();
  })

  return (
    <div>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
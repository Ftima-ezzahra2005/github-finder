import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [repo, setRepo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !repo) {
      alert('Please enter username and repo name');
      return;
    }

    onSearch(username, repo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Repository Name"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />

      <br /><br />

      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
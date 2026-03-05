import React, { useState } from 'react';
import Search from './components/Search';

function App() {
  const [repo, setRepo] = useState(null);

  const handleSearch = async (username, repoName) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const data = await res.json();
      setRepo(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Finder</h1>
      <Search onSearch={handleSearch} />
      {repo && (
        <div>
          <h2>{repo.full_name}</h2>
          <p>{repo.description}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View Repository
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
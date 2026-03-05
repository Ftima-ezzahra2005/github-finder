import './App.css';
import React, { useState } from 'react';
import Search from './components/Search';

function App() {
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (username, repo) => {
    try {
      setLoading(true);

      // Fetch User
      const userRes = await fetch(
        `https://api.github.com/users/${username}`
      );
      const user = await userRes.json();

      // Fetch Repo
      const repoRes = await fetch(
        `https://api.github.com/repos/${username}/${repo}`
      );
      const repoInfo = await repoRes.json();

      setUserData(user);
      setRepoData(repoInfo);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">

        {/* TITLE */}
        <div className="title">
          <h1>GitHub Finder</h1>
          <p>Find User & Repository Info</p>
        </div>

        {/* SEARCH */}
        <div className="card search-card">
          <Search onSearch={handleSearch} />
        </div>

        {loading && <p>Loading...</p>}

        {/* RESULT */}
        {!loading && (userData || repoData) && (
          <div className="card result-card">

            {/* USER */}
            {userData && (
              <div className="user-card">
                <img
                  src={userData.avatar_url}
                  alt="profile"
                  width="130"
                />
                <h2>{userData.name}</h2>
                <p>{userData.bio}</p>
                <div className="stats">
                  <span>{userData.followers} Followers</span>
                  <span>Location: {userData.location}</span>
                </div>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Profile
                </a>
              </div>
            )}

            {/* REPO */}
            {repoData && (
              <div className="repo-profile">
                <h2>{repoData.full_name}</h2>
                <p className="repo-desc">{repoData.description}</p>
                <div className="stats">
                  <span>Stars: {repoData.stargazers_count}</span>
                  <span>Forks: {repoData.forks_count}</span>
                </div>
                <p className="date">
                  Created: {repoData.created_at.slice(0, 10)}
                </p>
                <a
                  href={repoData.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-btn"
                >
                  View Repository
                </a>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;

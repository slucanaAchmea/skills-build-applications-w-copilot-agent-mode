import React, { useEffect, useState } from 'react';

const Teams = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace !== 'localhost' ? 'https' : 'http';
  const url = `${protocol}://${codespace}-8000.app.github.dev/api/teams/`;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', url);
        console.log('Fetched teams:', data);
        setTeams(data.results || data);
      });
  }, [url]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title h3 mb-4">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-info">
              <tr>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-success mt-3">Create Team</button>
      </div>
    </div>
  );
};

export default Teams;

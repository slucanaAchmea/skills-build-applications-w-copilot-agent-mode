import React, { useEffect, useState } from 'react';

const Activities = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace !== 'localhost' ? 'https' : 'http';
  const url = `${protocol}://${codespace}-8000.app.github.dev/api/activities/`;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API endpoint:', url);
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      });
  }, [url]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title h3 mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary mt-3">Add Activity</button>
      </div>
    </div>
  );
};

export default Activities;

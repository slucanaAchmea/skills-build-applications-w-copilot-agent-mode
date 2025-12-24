
const Workouts = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace !== 'localhost' ? 'https' : 'http';
  const url = `${protocol}://${codespace}-8000.app.github.dev/api/workouts/`;
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', url);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results || data);
      });
  }, [url]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title h3 mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-danger">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.name || `Workout ${idx + 1}`}</td>
                  <td>{workout.type || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary mt-3">Add Workout</button>
      </div>
    </div>
  );
};

export default Workouts;

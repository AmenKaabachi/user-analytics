import { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from './ActivityLogTab.module.css';

function ActivityLogTab() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get(
          'http://localhost:5000/api/activity-logs', // Update the URL to point to the backend server
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLogs(response.data);
      } catch (error) {
        setMessage('Failed to load activity logs');
        setMessageType('danger');
        console.error('Error fetching activity logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className={styles.tabContent}>
      <h2>Activity Log</h2>
      {message && (
        <Alert variant={messageType} className="mt-3 fade show">
          {message}
        </Alert>
      )}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.date).toLocaleString()}</td>
              <td>{log.activity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ActivityLogTab;

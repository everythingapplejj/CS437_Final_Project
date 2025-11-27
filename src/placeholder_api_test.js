
import React, { useState, useEffect } from 'react';

function TestApp() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        // ✅ ADD IDs PARAMETER HERE
        const response = await fetch('http://localhost:3001/api/crypto/prices/real?ids=bitcoin,ethereum');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        setData(result);
      } catch (err) {
        console.error('API Test Failed:', err);
        setError(err.message);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>API Connection Test</h1>
      {error && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
          <h3>Error: {error}</h3>
          <p>Make sure your backend is running on port 3001</p>
        </div>
      )}
      {data && (
        <div style={{ color: 'green', padding: '10px', border: '1px solid green' }}>
          <h3>✅ API Connected Successfully!</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default TestApp;
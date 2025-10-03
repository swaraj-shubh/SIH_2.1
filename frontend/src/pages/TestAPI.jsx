// TestAPI.jsx - Create this temporary component to test your API
import React, { useState } from 'react';

const TestAPI = () => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const testEndpoint = async () => {
        setLoading(true);
        try {
            const result = await fetch('/api/patents/0');
            const text = await result.text();
            setResponse(text.substring(0, 500) + '...'); // Show first 500 chars
            console.log('Full response:', text);
        } catch (error) {
            setResponse('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <button 
                onClick={testEndpoint}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Testing...' : 'Test API Endpoint'}
            </button>
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <pre>{response || 'Click to test API'}</pre>
            </div>
        </div>
    );
};

export default TestAPI;
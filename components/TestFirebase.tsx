 'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Adjust the import path if needed

export default function TestFirebase() {
  const [status, setStatus] = useState('Connecting...');
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkConnection() {
      try {
        // This will try to read from a collection named 'test_collection'.
        // This will fail if the collection doesn't exist OR if your security rules block it.
        // The goal is to see if we get a Firebase-specific error or a success message.
        const querySnapshot = await getDocs(collection(db, 'test_collection'));
        setStatus(`Connection successful! Found ${querySnapshot.docs.length} documents in 'test_collection'.`);
      } catch (e: any) {
        setStatus('Connection failed.');
        setError(e.message);
        console.error("Firebase connection error:", e);
      }
    }

    checkConnection();
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h2>Firebase Connection Test</h2>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {error && (
        <p style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  );
}
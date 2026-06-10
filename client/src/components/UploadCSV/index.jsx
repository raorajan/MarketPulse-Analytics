import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import api from '../../services/api';
import './UploadCSV.css';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setStatus('idle');
        setMessage('');
      } else {
        setFile(null);
        setStatus('error');
        setMessage('Please select a valid CSV file.');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    setMessage('');

    try {
      // Simulate API call for uploading
      const formData = new FormData();
      formData.append('file', file);
      
      // In a real scenario, we would use api.post('/upload', formData)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('File uploaded successfully!');
      setFile(null);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-dropzone">
        <input 
          type="file" 
          id="csv-upload" 
          accept=".csv, text/csv" 
          onChange={handleFileChange}
          className="upload-input"
          disabled={status === 'uploading'}
        />
        <label htmlFor="csv-upload" className="upload-label">
          {file ? (
            <div className="upload-file-info">
              <FiFile className="upload-icon-small" />
              <span>{file.name}</span>
            </div>
          ) : (
            <div className="upload-placeholder">
              <FiUploadCloud className="upload-icon" />
              <span>Click to select a CSV file</span>
            </div>
          )}
        </label>
      </div>

      <div className="upload-actions">
        <button 
          onClick={handleUpload} 
          disabled={!file || status === 'uploading'}
          className={`upload-btn ${status === 'uploading' ? 'uploading' : ''}`}
        >
          {status === 'uploading' ? 'Uploading...' : 'Upload Data'}
        </button>
      </div>

      {status === 'success' && (
        <div className="upload-message success">
          <FiCheckCircle className="message-icon" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="upload-message error">
          <FiAlertCircle className="message-icon" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;

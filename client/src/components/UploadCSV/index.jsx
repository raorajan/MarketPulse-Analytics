import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { uploadService } from '../../services/uploadService';
import './UploadCSV.css';

const UploadCSV = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [message, setMessage] = useState('');
  const [recordCount, setRecordCount] = useState(0);

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
      const result = await uploadService.uploadCSV(file);

      setStatus('success');
      setMessage(result.message || 'File uploaded successfully!');
      setRecordCount(result.totalRecords || 0);
      setFile(null);

      // Reset the file input
      const fileInput = document.getElementById('csv-upload');
      if (fileInput) fileInput.value = '';

      // Notify parent to refresh data
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      // Auto-clear success after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage(
        error.response?.data?.message || 'Failed to upload file. Please try again.'
      );
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
              <span className="upload-hint">Supports .csv files</span>
            </div>
          )}
        </label>
      </div>

      <div className="upload-actions">
        <button
          id="upload-btn"
          onClick={handleUpload}
          disabled={!file || status === 'uploading'}
          className={`upload-btn ${status === 'uploading' ? 'uploading' : ''}`}
        >
          {status === 'uploading' ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {status === 'success' && (
        <div className="upload-message success">
          <FiCheckCircle className="message-icon" />
          <span>
            ✓ {message}
            {recordCount > 0 && (
              <span className="upload-record-count"> — {recordCount} records imported</span>
            )}
          </span>
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

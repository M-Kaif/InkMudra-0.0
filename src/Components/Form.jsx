import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Form() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      readFileContent(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    readFileContent(file);
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('your-upload-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('File uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setFileContent('');
  };

  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFileContent(reader.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6">
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-6 rounded-lg ${
          isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-400'
        }`}
        sx={{ height: 200 }}
      >
        {selectedFile ? (
          <Box>
            <Typography variant="h6" className="mb-2">
              File Content:
            </Typography>
            <Typography
              sx={{
                whiteSpace: 'pre-wrap', // Preserve whitespace formatting
                overflowY: 'auto',
                maxHeight: '100%',
              }}
            >
              {fileContent}
            </Typography>
          </Box>
        ) : (
          <Typography>Drag and drop a file here, or click to select a file</Typography>
        )}
      </Box>
      {selectedFile && (
        <Box className="mt-2">
          <Typography variant="body1">
            Selected File: {selectedFile.name}
          </Typography>
          <Box mt={1}>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpload}
              className="mr-2"
            >
              Upload
            </Button>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button
          variant="contained"
          color="primary"
          onClick={() => document.getElementById('fileInput').click()}
          className="mt-4"
        >
          Choose File
        </Button>
      </label>
    </div>
  );
}

export default Form;

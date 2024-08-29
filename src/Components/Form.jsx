import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { PDFDocument } from 'pdf-lib';

const steps = ['Upload Files', 'Print Options', 'Address', 'Payment'];

function Form() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [printOptions, setPrintOptions] = useState({
    copies: '1',
    categories: '',
    paperSize: '',
    printColor: '',
    printingSides: '',
    orientation: '',
    bindingOption: '',
    paperType: '',
    printSpeed: '',
    otherDescription: ''
  });
  const [orderDetails, setOrderDetails] = useState({
    streetAddress: '',
    city: 'Mumbai',
    postalCode: '',
    phoneNumber: '',
    referralCode: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => readPdfPageCount(file));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    files.forEach((file) => readPdfPageCount(file));
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
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to upload.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('files', file));

    fetch('your-upload-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Files uploaded successfully:', data);
        handleComplete();
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  const handleDelete = (fileName) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
      return updatedFiles;
    });
    setNumberOfPages((prev) => {
      const { [fileName]: _, ...rest } = prev;
      return rest;
    });
    setTotalCost((prevCost) => {
      const pagesToRemove = numberOfPages[fileName] || 0;
      return prevCost - 4 * pagesToRemove;
    });
  };

  const readPdfPageCount = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      setNumberOfPages((prev) => ({ ...prev, [file.name]: totalPages }));
      setTotalCost((prevCost) => prevCost + 4 * totalPages);
      setSelectedFiles((prevFiles) => [...prevFiles, file]);
    } catch (error) {
      console.error('Error reading PDF:', error);
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleComplete = () => {
    setCompleted((prevCompleted) => ({ ...prevCompleted, [step]: true }));
    handleNext();
  };

  const validateStep = (step) => {
    let valid = true;
    switch (step) {
      case 0:
        if (selectedFiles.length === 0) {
          alert('Please upload at least one file.');
          valid = false;
        }
        break;
      case 1:
        for (const [key, value] of Object.entries(printOptions)) {
          if (value === '') {
            setErrors((prevErrors) => ({ ...prevErrors, [key]: 'This field is required' }));
            valid = false;
          }
        }
        break;
      case 2:
        for (const [key, value] of Object.entries(orderDetails)) {
          if (key !== 'referralCode' && value === '') { // Skip referralCode
            setErrors((prevErrors) => ({ ...prevErrors, [key]: 'This field is required' }));
            valid = false;
          }
        }
        break;
      default:
        break;
    }
    return valid;
  };

  const handleStepClick = (index) => {
    if (index === 0 || isStepCompleted(index - 1)) {
      setStep(index);
    }
  };

  const isStepCompleted = (stepIndex) => {
    return stepIndex === 0 || completed[stepIndex] === true;
  };

  const handlePrintOptionChange = (event) => {
    setPrintOptions({
      ...printOptions,
      [event.target.name]: event.target.value
    });
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: '' }));
  };

  const handleOrderDetailChange = (event) => {
    setOrderDetails({
      ...orderDetails,
      [event.target.name]: event.target.value
    });
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: '' }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Box className="p-4 bg-gray-100 rounded-lg">
            <Typography variant="h6" className="mb-4">Step 1: Upload Files</Typography>
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed p-6 rounded-lg ${
                isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-400'
              }`}
              sx={{ height: 200 }}
            >
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file) => (
                  <Box key={file.name} className="flex items-center justify-between mb-2">
                    <Typography variant="body1">{file.name}</Typography>
                    <Typography variant="body2">Pages: {numberOfPages[file.name]}</Typography>
                    <IconButton onClick={() => handleDelete(file.name)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography>
                  Drag and drop PDF files here, or click to select files
                </Typography>
              )}
            </Box>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              multiple
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
                Choose Files
              </Button>
            </label>
          </Box>
        );
      case 1:
        return (
          <Box className="p-4 bg-gray-100 rounded-lg">
            <Typography variant="h6" className="mb-4">Step 2: Print Options</Typography>
            <Box>
              <Typography variant="body1" className="mb-2">Copies:</Typography>
              <input
                type="number"
                name="copies"
                value={printOptions.copies}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.copies && <Typography color="error">{errors.copies}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Categories:</Typography>
              <input
                type="text"
                name="categories"
                value={printOptions.categories}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.categories && <Typography color="error">{errors.categories}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Paper Size:</Typography>
              <input
                type="text"
                name="paperSize"
                value={printOptions.paperSize}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.paperSize && <Typography color="error">{errors.paperSize}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Print Color:</Typography>
              <input
                type="text"
                name="printColor"
                value={printOptions.printColor}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.printColor && <Typography color="error">{errors.printColor}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Printing Sides:</Typography>
              <input
                type="text"
                name="printingSides"
                value={printOptions.printingSides}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.printingSides && <Typography color="error">{errors.printingSides}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Orientation:</Typography>
              <input
                type="text"
                name="orientation"
                value={printOptions.orientation}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.orientation && <Typography color="error">{errors.orientation}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Binding Option:</Typography>
              <input
                type="text"
                name="bindingOption"
                value={printOptions.bindingOption}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.bindingOption && <Typography color="error">{errors.bindingOption}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Paper Type:</Typography>
              <input
                type="text"
                name="paperType"
                value={printOptions.paperType}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.paperType && <Typography color="error">{errors.paperType}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Print Speed:</Typography>
              <input
                type="text"
                name="printSpeed"
                value={printOptions.printSpeed}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
              />
              {errors.printSpeed && <Typography color="error">{errors.printSpeed}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Other Description:</Typography>
              <textarea
                name="otherDescription"
                value={printOptions.otherDescription}
                onChange={handlePrintOptionChange}
                className="border rounded p-2 w-full"
                rows="4"
              />
              {errors.otherDescription && <Typography color="error">{errors.otherDescription}</Typography>}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box className="p-4 bg-gray-100 rounded-lg">
            <Typography variant="h6" className="mb-4">Step 3: Address & Order Confirmation</Typography>
            <Box>
              <Typography variant="body1" className="mb-2">Street Address:</Typography>
              <input
                type="text"
                name="streetAddress"
                value={orderDetails.streetAddress}
                onChange={handleOrderDetailChange}
                className="border rounded p-2 w-full"
              />
              {errors.streetAddress && <Typography color="error">{errors.streetAddress}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">City:</Typography>
              <input
                type="text"
                name="city"
                value={orderDetails.city}
                onChange={handleOrderDetailChange}
                className="border rounded p-2 w-full"
                disabled
              />
              {errors.city && <Typography color="error">{errors.city}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">State:</Typography>
              <input
                type="text"
                name="state"
                value={orderDetails.state}
                onChange={handleOrderDetailChange}
                className="border rounded p-2 w-full"
              />
              {errors.state && <Typography color="error">{errors.state}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Postal Code:</Typography>
              <input
                type="text"
                name="postalCode"
                value={orderDetails.postalCode}
                onChange={handleOrderDetailChange}
                className="border rounded p-2 w-full"
              />
              {errors.postalCode && <Typography color="error">{errors.postalCode}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Phone Number:</Typography>
              <input
                type="text"
                name="phoneNumber"
                value={orderDetails.phoneNumber}
                onChange={handleOrderDetailChange}
                className="border rounded p-2 w-full"
              />
              {errors.phoneNumber && <Typography color="error">{errors.phoneNumber}</Typography>}

              <Typography variant="body1" className="mt-4 mb-2">Referral Code (Optional):</Typography>
              <input
                type="text"
                name="referralCode"
                value={orderDetails.referralCode}
                onChange={handleOrderDetailChange}
                className="border rounded p-2 w-full"
              />
              {errors.referralCode && <Typography color="error">{errors.referralCode}</Typography>}
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box className="p-4 bg-gray-100 rounded-lg">
            <Typography variant="h6" className="mb-4">Step 4: Payment</Typography>
            <Typography variant="body1">Total Cost: ${totalCost}</Typography>
            {/* Add payment details form or integration here */}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="max-w-4xl mx-auto p-4">
      <Stepper alternativeLabel activeStep={step} className="mb-4">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepButton onClick={() => handleStepClick(index)} completed={isStepCompleted(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {renderStepContent()}
      <Box className="flex justify-between mt-4">
        {step > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={step === steps.length - 1 ? handleUpload : handleNext}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default Form;

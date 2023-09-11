const uploadFileHandler = async (event) => {
    event.preventDefault();
  
    const fileInput = document.querySelector('#fileUpload');
    const name = document.querySelector('#imageName').value.trim();
    const description = document.querySelector('#imageDescription').value.trim();
  
    if (!fileInput.files[0]) {
      alert('Please select a file to upload');
      return;
    }
  
    const formData = new FormData();
  
    formData.append('fileUpload', fileInput.files[0]);
    formData.append('imageName', name);
    formData.append('imageDescription', description);
  
    const formattedDate = dayjs().format('MMM DD, YY');
  
    formData.append('uploadDate', formattedDate);
  
    try {
      const response = await fetch('/api/upload', { // Updated API route
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading the file');
    }
  };
  
  const saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', uploadFileHandler);
  
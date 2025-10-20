# Backend Setup Guide

## Installation

Install the required backend dependencies:

```bash
npm install express multer cors
```

## Running the Server

Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:3000`

## Endpoints

### Single File Upload
- **POST** `/upload`
- Accepts a single file with the field name `file`
- Returns file information

### Multiple Files Upload
- **POST** `/upload-multiple`
- Accepts multiple files with the field name `files`
- Max 10 files at once

### Get Uploaded File
- **GET** `/files/:filename`
- Returns the uploaded file

## File Storage

- Files are stored in the `uploads/` directory
- Filenames are prefixed with timestamp to ensure uniqueness
- Default max file size: 10MB

## Configuration

You can customize the following in `server.js`:

1. **File size limit**: Change the `limits.fileSize` value
2. **File types**: Uncomment and modify the `fileFilter` function
3. **Storage location**: Modify the `destination` in storage config
4. **Port**: Change the `PORT` variable

## Frontend Integration

The frontend (App.jsx) is already configured to:
- Select files via file input
- Upload files using axios and FormData
- Show upload progress
- Display upload status

Make sure both frontend (Vite) and backend (Express) servers are running:
- Frontend: `npm run dev` (usually on http://localhost:5173)
- Backend: `node server.js` (on http://localhost:3000)

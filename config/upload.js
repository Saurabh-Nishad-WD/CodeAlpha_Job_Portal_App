// Import necessary packages
import multer from 'multer';

// Configure multer for storage and file handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Folder where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Rename file to avoid collisions
    }
});

// Define upload variable
const upload = multer({ storage: storage });

export default upload;

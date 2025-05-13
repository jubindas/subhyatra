import multer from 'multer';
import path from 'path';

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');  // Store images in uploads/rooms directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Use unique filename
  },
});

// File type filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  cb(null, allowedTypes.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

export default upload;

// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
//   fileFilter: function (req, file, callback) {
//     const allowedFileTypes = ['image/jpeg', 'image/png'];
//     if (allowedFileTypes.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       const error = new Error('File type is incorrect');
//       callback(error, false);
//     }
//   },
// });

// module.exports = { upload };

const multer = require('multer');

// Set up memory storage for uploaded files
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB file size limit
  fileFilter: (req, file, callback) => {
    try {
      console.log('Uploaded file MIME type:', file.mimetype);
      const allowedFileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'application/pdf'];
      
      if (allowedFileTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        console.error('Unsupported file type:', file.mimetype);
        callback(new Error('Unsupported file type'), false);
      }
    } catch (error) {
      console.error('Error in fileFilter:', error);
      callback(new Error('File upload error'), false);
    }
  }
  
}).fields([
  { name: 'image', maxCount: 1 }, // Adjust maxCount as necessary
]);

module.exports = upload;




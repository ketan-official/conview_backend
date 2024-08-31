const {createSectionTemp,updateSection ,deleteById,getSection,getSinglesec,updateSec,getAllsection} =require("../Controllers/section.ctl");
const multer =require('multer')
const express = require('express');
const { upload } = require("../middleware/MulterFile");
const router = express.Router();
router.post('/sections/create',createSectionTemp);
router.delete('/sections/delete/:id',deleteById);
router.get('/sections/get',getSection);
router.get('/sections/getAll',getAllsection);
router.get('/getsections/get/:id',getSinglesec);
// router.put('/sections/files/:id',upload.single('sectionsImage'),UploadsectionsImage);
router.put('/sections/update/:id',updateSec);




module.exports = router;
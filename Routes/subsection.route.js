const {createSubSectionTemp,getSubCat ,deleteById,getAllCategoriesWithSubcategories,getSinglecat} =require("../Controllers/subsection.ctl");
const multer =require('multer')
const express = require('express');
const { upload } = require("../middleware/MulterFile");
const router = express.Router();
router.post('/sub-sec/create',createSubSectionTemp);
router.get('/sub-sec/getAll',getSubCat);
router.get('/sub-sec/get/:id',getSinglecat);
router.get('/sub-sec/get-by-sec',getAllCategoriesWithSubcategories);
router.delete('/sub-sec/delete/:id',deleteById);
module.exports = router;
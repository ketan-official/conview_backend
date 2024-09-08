const {createsub_chield_sectionTemp,getSubChieldSec ,deleteById,getSinglechieldSec} =require("../Controllers/subChieldsection.ctl");
const multer =require('multer')
const express = require('express');
const { upload } = require("../middleware/MulterFile");
const router = express.Router();
router.post('/sub-chield-sec/create',createsub_chield_sectionTemp);
router.get('/sub-chield-sec/getAll',getSubChieldSec);
router.get('/sub-chield-sec/get/:id',getSinglechieldSec);

router.delete('/sub-chield-sec/delete/:id',deleteById);
module.exports = router;
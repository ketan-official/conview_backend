const SectionModel = require("../Models/section");
// const slug = require('slug');
const slugify = require("slugify");
const { uploadsingleToS3, uploadToS3 } = require("../middleware/Uploads");
// import {uploadToS3} from '../routes/Section.js';

//create Sections function

exports.createSectionTemp = async (req, res) => {
  const { name } = req.body;

  const cat = new SectionModel({
    name,
  });

  cat.save((error, Section) => {
    if (error) return res.status(400).json({ error });
    if (Section) {
      return res.status(201).json({ Section });
    }
  });
};





exports.updateSection = async (req, res) => {
  let SectionImage;
  await uploadToS3(req.file.buffer).then((res) => {
    SectionImage = res.Location;
  });
  req.body.SectionImage = SectionImage;
  SectionModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json(data);
      } catch (err) {
        res.json({ err });
      }
    }
  );
};

exports.deleteById = (req, res) => {
  SectionModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ err });
    } else {
      res.json(data);
    }
  });
};

exports.getSection = (req, res) => {
  SectionModel.find().exec((error, Sections) => {
    if (error) return res.status(400).json({ error });
    if (Sections) {
      res.status(200).json({ Sections });
    }
  });
};
exports.getAllsection = async (req, res) => {
  try {
    const data = await SectionModel.find();
    res.json({
      statuscode: 200,
      success: true,
      message: "fetch data successfully",
      data: data,
    });
  } catch {
    (err) =>
      res.json({
        statuscode: 500,
        success: false,
        message: "fetch data Problem",
        error: err,
      });
  }
};
exports.getSinglesec = async (req, res) => {
  try {
    const cat = await SectionModel.find({ _id: req.params.id });
    res.json(cat);
  } catch (err) {
    res.json({ err });
  }
};

exports.UploadSectionImage = async (req, res) => {
  let SectionImage;
  if (req.file) {
    let fileData = req.file.buffer;
    let fileType;
    if (req.file.mimetype === "application/pdf") {
      fileType = "pdf";
    } else if (
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg"
    ) {
      fileType = "jpg";
    } else if (req.file.mimetype === "image/png") {
      fileType = "png";
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Call the uploadToS3 function to upload the file to S3
    let { Location } = await uploadsingleToS3(fileData, fileType);
    SectionImage = Location;
  }
  SectionModel
    .findOneAndUpdate({ _id: req.params.id }, { SectionImage })
    .then((data) => {
      res.status(200).json({
        message: "SectionImage updated successfully",
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.updateSec = (req, res) => {
  SectionModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json(data);
      } catch (err) {
        res.json({ err });
      }
    }
  );
};


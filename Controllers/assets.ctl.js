const assetsModel = require("../Models/assets");

exports.createassets = async (req, res) => {
  const {
    assetNumber,
    section,
    subsection,
    description,
    additionalParam1,
    additionalParam2,
    additionalParam3,
    additionalParam4,
    other,
    image,
    userId
  } = req.body;

  const create_assetsModel = new assetsModel({
    assetNumber,
    section,
    subsection,
    description,
    additionalParam1,
    additionalParam2,
    additionalParam3,
    additionalParam4,
    other,
    image,
    userId
  });

  create_assetsModel.save((error, data) => {
    if (error)
      return res.status(400).json({
        statuscode: 500,
        success: false,
        message: "product not send in assetsrite ",
        error: error,
      });
    if (data) {
      res.status(201).json({
        statuscode: 200,
        success: true,
        message: "product sended in assetsrite",
        data: data,
      });
    }
  });
};

exports.getassets = async (req, res) => {
  try {
    const data = await assetsModel.find()
    .populate('section') // Assuming 'section' is the reference field in your assets model
    .populate('subsection'); // Assuming 'subsection' is the reference field in your assets model

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

exports.getSingleassets = async (req, res) => {
  try {
    const data = await assetsModel.find({ _id: req.params.id })
    .populate('section') // Assuming 'section' is the reference field in your assets model
    .populate('subsection'); // Assuming 'subsection' is the reference field in your assets model
    ;
    res.json({
      statuscode: 200,
      success: true,
      message: "fetch data successfully",
      Data: data,
    });
  } catch (err) {
    res.json({
      statuscode: 500,
      success: false,
      message: "fetch data Problem",
      error: err,
    });
  }
};
exports.getuserassets = async (req, res) => {
  try {
    const data = await assetsModel.find({ userId: req.params.id })
    .populate('section') // Assuming 'section' is the reference field in your assets model
    .populate('subsection'); // Assuming 'subsection' is the reference field in your assets model
    ;
    res.json({
      statuscode: 200,
      success: true,
      message: "fetch data successfully",
      Data: data,
    });
  } catch (err) {
    res.json({
      statuscode: 500,
      success: false,
      message: "fetch data Problem",
      error: err,
    });
  }
};

exports.updateassets = (req, res) => {
  assetsModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json({
          statuscode: 200,
          success: true,
          message: "data updated successfully",
          Data: data,
        });
      } catch (err) {
        res.json({
          statuscode: 200,
          success: true,
          message: "data updated successfully",
          error: error,
        });
      }
    }
  );
};

exports.deleteassets = (req, res) => {
  assetsModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({
        statuscode: 500,
        success: true,
        message: "data deleted successfully",
        error: err,
      });
    } else {
      res.json({
        statuscode: 200,
        success: true,
        message: "data deleted successfully",
        Data: data,
      });
    }
  });
};

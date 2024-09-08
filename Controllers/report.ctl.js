const ReportModel = require("../Models/report");

exports.createReport = async (req, res) => {
  const { 
    jobNumber,
    projectName,
    customer,
    siteContact,
    dateCreated,
    status,
    emailSent,
    emailSentTo,
    type,
    userId
 } = req.body;

  const create_ReportModel = new ReportModel({
    jobNumber,
    projectName,
    customer,
    siteContact,
    dateCreated,
    status,
    emailSent,
    emailSentTo,
    type,
    userId
  });

  create_ReportModel.save((error, data) => {
    if (error)
      return res.status(400).json({
        statuscode: 500,
        success: false,
        message: "product not send in Reportrite ",
        error: error,
      });
    if (data) {
      res.status(201).json({
        statuscode: 200,
        success: true,
        message: "product sended in Reportrite",
        data: data,
      });
    }
  });
};

exports.getReport = async (req, res) => {
  try {
    const data = await ReportModel.find();
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


exports.getSingleReport = async (req, res) => {
  try {
    const data = await ReportModel.find({ _id: req.params.id });
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

exports.updateReport = (req, res) => {
  ReportModel.findOneAndUpdate(
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

exports.deleteReport = (req, res) => {
  ReportModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

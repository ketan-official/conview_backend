const OrganizationModel = require("../Models/organization");

exports.createOrganization = async (req, res) => {
  const {
    companyName,
    address,
    city,
    country,
    email,
    firstName,
    lastName,
    number,
    phone,
    postalCode,
    prov,
  } = req.body;

  const create_OrganizationModel = new OrganizationModel({
    companyName,
    address,
    city,
    country,
    email,
    firstName,
    lastName,
    number,
    phone,
    postalCode,
    prov,
  });

  create_OrganizationModel.save((error, data) => {
    if (error)
      return res.status(400).json({
        statuscode: 500,
        success: false,
        message: "product not send in Organizationrite ",
        error: error,
      });
    if (data) {
      res.status(201).json({
        statuscode: 200,
        success: true,
        message: "product sended in Organizationrite",
        data: data,
      });
    }
  });
};

exports.getOrganization = async (req, res) => {
  try {
    const data = await OrganizationModel.find();
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

exports.getSingleOrganization = async (req, res) => {
  try {
    const data = await OrganizationModel.find({ _id: req.params.id });
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

exports.updateOrganization = (req, res) => {
  OrganizationModel.findOneAndUpdate(
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

exports.deleteOrganization = (req, res) => {
  OrganizationModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

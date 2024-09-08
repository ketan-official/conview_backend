const sub_chield_sectionModel = require("../Models/subChildsection");
const catModel = require("../Models/section");
const slugify = require("slugify");
exports.createsub_chield_sectionTemp = async (req, res) => {
  const { name, catId, subCatId } = req.body;

  const cat = new sub_chield_sectionModel({
    name,
    catId,
    subCatId,
  });

  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getSubCategories = (req, res) => {
  sub_chield_sectionModel.find().exec((error, SubCategories) => {
    if (error) return res.status(400).json({ error });
    if (SubCategories) {
      const categoryList = createSubCategories(SubCategories, id);
      res.status(200).json({ categoryList });
    }
  });
};

exports.deleteById = (req, res) => {
  sub_chield_sectionModel.findOneAndDelete(
    { _id: req.params.id },
    (err, data) => {
      if (err) {
        res.json({ err });
      } else {
        res.json(data);
      }
    }
  );
};

exports.getSinglechieldSec = async (req, res) => {
  try {
    const cat = await sub_chield_sectionModel.find({ _id: req.params.id });
    res.json(cat);
  } catch (err) {
    res.json({ err });
  }
};

exports.getSubChieldSec = async (req, res) => {
  try {
    const cat = await sub_chield_sectionModel.find({ parentId: req.params.id });
    res.json(cat);
  } catch (err) {
    res.json({ err });
  }
};



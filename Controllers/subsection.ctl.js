const SubSectionModel = require("../Models/subsection");
const SubChieldSectionModel = require("../Models/subChildsection");
const catModel = require("../Models/section");
const slugify = require("slugify");
exports.createSubSectionTemp = async (req, res) => {
  const { name, parentId } = req.body;

  const cat = new SubSectionModel({
    name,
    parentId,
  });

  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getSubCategories = (req, res) => {
  SubSectionModel.find().exec((error, SubCategories) => {
    if (error) return res.status(400).json({ error });
    if (SubCategories) {
      const categoryList = createSubCategories(SubCategories, id);
      res.status(200).json({ categoryList });
    }
  });
};

exports.deleteById = (req, res) => {
  SubSectionModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ err });
    } else {
      res.json(data);
    }
  });
};


exports.getSinglecat = async (req, res) => {
  try {
    const cat = await SubSectionModel.find({ _id: req.params.id });
    res.json(cat);
  } catch (err) {
    res.json({ err });
  }
};

exports.getSubCat = async (req, res) => {
  try {
    const cat = await SubSectionModel.find({ parentId: req.params.id });
    res.json(cat);
  } catch (err) {
    res.json({ err });
  }
};

exports.getAllCategoriesWithSubcategories = async (req, res) => {
  try {
    // Fetch all categories, subcategories, and sub-child categories
    const categories = await catModel.find().lean();
    const subcategories = await SubSectionModel.find().lean();
    const subChieldcategories = await SubChieldSectionModel.find().lean();

    // Group sub-child categories by subcategory (parent) ID
    const subChildCategoriesBySubcategory = subChieldcategories.reduce((acc, subChild) => {
      const parentId = subChild.subCatId.toString();
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(subChild);
      return acc;
    }, {});

    // Group subcategories by category (parent) ID
    const subcategoriesByCategory = subcategories.reduce((acc, subCategory) => {
      const parentId = subCategory.parentId.toString();
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      // Attach sub-child categories to each subcategory
      subCategory.subChildCategories = subChildCategoriesBySubcategory[subCategory._id.toString()] || [];
      acc[parentId].push(subCategory);
      return acc;
    }, {});

    // Attach subcategories to their corresponding categories
    const categoriesWithSubcategories = categories.map((category) => {
      const categoryId = category._id.toString();
      return {
        ...category,
        subcategories: subcategoriesByCategory[categoryId] || []
      };
    });

    res.status(200).json(categoriesWithSubcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const express = require("express");
const router = express.Router();

// Create Address routes
router.post(
  "/organization/create",
  require("../Controllers/organizaltion.Ctl").createOrganization
);

// Get Address routes
router.get("/organization/getAll", require("../Controllers/organizaltion.Ctl").getOrganization);

router.get(
  "/organization/get/:id",
  require("../Controllers/organizaltion.Ctl").getSingleOrganization
);

router.delete(
  "/organization/delete/:id",
  require("../Controllers/organizaltion.Ctl").deleteOrganization
);

// Update Address routes
router.put("/organization/:id", require("./../Controllers/organizaltion.Ctl").updateOrganization);

module.exports = router;

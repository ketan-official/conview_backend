const express = require("express");
const router = express.Router();

// Create Address routes
router.post(
  "/report/create",
  require("../Controllers/report.ctl").createReport
);

// Get Address routes
router.get("/report/getAll", require("../Controllers/report.ctl").getReport);

router.get(
  "/report/get/:id",
  require("../Controllers/report.ctl").getSingleReport
);

router.delete(
  "/report/delete/:id",
  require("../Controllers/report.ctl").deleteReport
);

// Update Address routes
router.put("/report/:id", require("./../Controllers/report.ctl").updateReport);

module.exports = router;

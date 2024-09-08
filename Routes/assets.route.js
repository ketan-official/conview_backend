const express = require("express");
const router = express.Router();

// Create Address routes
router.post(
  "/assets/create",
  require("../Controllers/assets.ctl").createassets
);

// Get Address routes
router.get("/assets/getAll", require("../Controllers/assets.ctl").getassets);

router.get(
  "/assets/get/:id",
  require("../Controllers/assets.ctl").getSingleassets
);
router.get(
  "/assets/get-user/:id",
  require("../Controllers/assets.ctl").getuserassets
);

router.delete(
  "/assets/delete/:id",
  require("../Controllers/assets.ctl").deleteassets
);

// Update Address routes
router.put("/assets/update/:id", require("./../Controllers/assets.ctl").updateassets);

module.exports = router;

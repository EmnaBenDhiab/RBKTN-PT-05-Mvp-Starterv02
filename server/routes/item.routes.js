const router = require('express').Router();
const itemController = require("../controllers/item.controller");

router.get("/", itemController.selectAll);
router.post("/", itemController.addItems);
router.put("/", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);


module.exports = router;
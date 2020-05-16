const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item model
const Item = require("../../models/Item");

//@route GET api/items
//@description Get all posts
//@access Public

router.get("/:userID", (req, res) => {
  // paths now protected
  Item.find({ userID: req.params.userID })
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route POST api/items
//@description Create a post
//@access Private

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    userID: req.body.userID,
  });
  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items
//@description Delete a post
//@access Private

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;

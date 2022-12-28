const router = require("express").Router();
const contact = require("../Database/Contact");

router.post("/contact/update", async (req, res) => {
  try {
    const findOne = await contact.find({ id: req.body.id });
    if (findOne.length > 0) {
      // update
      const updateOne = await contact.findOneAndUpdate(
        { id: req.body.id },
        { $set: req.body.Change },
        { new: true }
      );
      console.log(updateOne);
      res.status(200).json({ success: "updated successfully" });
    } else {
      // create
      const newContact = new contact({
        id: req.body.id,
        ContactNumber: req.body.Change.ContactNumber,
        EmailAddress: req.body.Change.EmailAddress,
        Address: req.body.Change.Address,
      });
      await newContact.save();
      console.log(newContact);
      res.status(200).json({ success: "new contact created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
});
router.post("/contact/message", async (req, res) => {
  try {
    const newMessage = new contact(req.body);
    newMessage.save();
    res.status(200).json({ success: "message send successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

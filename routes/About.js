const router = require("express").Router();
const about = require("../Database/About");

router.get("/about", async (req, res) => {
  try {
    const aboutUser = await about.find();
    res.status(200).json({ data: aboutUser });
  } catch (error) {
    console.log(error);
  }
});

router.post("/about/update", async (req, res) => {
  try {
    const aboutUser = await about.findOne({ id: req.body.id });
    if (aboutUser) {
      // updata
      await about.updateOne({
        aboutPic: req.body.aboutPic ? req.body.aboutPic : about.aboutPic,
      });
      await about.updateOne({ smallDescription: req.body.smallDescription });
      res.status(200).json({ success: "About updated successfully" });
    } else {
      // create
      const newAbout = new about(req.body);
      await newAbout.save();
      res.status(200).json({ success: "About created successfully" });
    }
  } catch (error) {}
});

module.exports = router;

const router = require("express").Router();
const Hero = require("../Database/Hero");

// for adding data to the database
router.post("/hero/post", async (req, res) => {
  try {
    const hero = await Hero.findOne({ id: req.body.id });
    if (hero) {
      await hero.updateOne({
        profilePic: req.body.profilePic ? req.body.profilePic : hero.profilePic,
      });
      if (hero.heroLines.includes(req.body.heroLines)) {
        await hero.updateOne({ $pull: { heroLines: req.body.heroLines } });
        res.status(200).json({ success: "item removed successfully" });
      } else {
        await hero.updateOne({ $push: { heroLines: req.body.heroLines } });
        res.status(200).json({ success: "Line added successfully" });
        return;
      }
    } else {
      const newHero = new Hero(req.body);
      await newHero.save();
      res.status(200).json({ success: "Created and Line added successfully" });
    }

    console.log("hero saved successfully");
  } catch (error) {
    console.log(error);
  }
});

// getting the data

router.get("/hero", async (req, res) => {
  try {
    const sendToClient = await Hero.find();
    res.status(200).json({ hero: sendToClient });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

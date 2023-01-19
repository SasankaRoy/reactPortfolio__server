const router = require("express").Router();
const skill = require("../Database/Skills");

router.post("/skill/upload", async (req, res) => {
  try {
    const find = await skill.find({ skillImg: req.body.Image });

    if (find.length > 0) {
      // update
      const updatedValue = await skill.findOneAndUpdate(
        { skillImg: req.body.Image },
        {
          $set: {
            skillPerct: req.body.Status.status,
            direction: req.body.Status.direction,
          },
        },
        { new: true }
      );

      res.status(200).json({ success: updatedValue });
    } else {
      // create
      const newSkill = new skill({
        id: req.body.id,
        skillImg: req.body.Image,
        skillPerct: req.body.Status,
      });
      await newSkill.save();
      res.status(200).json({ success: "new skill created" });
      console.log("working in else");
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/skill", async (req, res) => {
  try {
    const findSkill = await skill.find();
    res.status(200).json({ findSkill });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

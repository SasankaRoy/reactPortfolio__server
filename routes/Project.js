const router = require("express").Router();
const project = require("../Database/Project");

router.get("/project", async (req, res) => {
  try {
    const findProject = await project.find();
    res.status(200).json({ findProject });
  } catch (error) {
    console.log(error);
  }
});

router.post("/project/updata", async (req, res) => {
  try {
    const newProject = new project({
      id: req.body.id,
      projectImg: req.body.Images.projectImg,
      projectName: req.body.text.projectName,
      buildBy: req.body.text.buildBy,
      techImg: req.body.Images.techImg,
      projectDescription: req.body.text.projectDescription,
      projectLink: req.body.text.projectLink,
    });
    await newProject.save();
    res.status(200).json({ success: "project added successfully😊😊" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/project/updata/techImg/:id", async (req, res) => {
  try {
    const updateProject = await project.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { techImg: req.body.fileName } },
      { new: true }
    );
    res.status(200).json({ success: "update successfull😊😊" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/project/updata/projectDescription/:id", async (req, res) => {
  try {
    console.log(req.body, req.params.id);
    const updateText = await project.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { projectDescription: req.body.Details } },
      { new: true }
    );
    res.status(200).json({ success: "update successful😊😊" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const express = require("express");
const app = express();
const port = 5000;
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const CORS = require("cors");
const multer = require("multer");
const path = require("path");
const Cookie = require("cookie-parser");

const Auth = require("./auth/Auth");
const hero = require("./routes/Hero");
const about = require("./routes/About");
const project = require("./routes/Project");
const skill = require("./routes/Skills");
const contact = require("./routes/Contact");

// env file config

dotenv.config();

// database
require("./Database/conn");
app.use("/image", express.static(path.join(__dirname, "public/images")));

const store = new mongoSession({
  uri: process.env.DATABASE,
  collection: "mySessions",
});

// middlewares...

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
    maxAge: 86400000,
    cookie: {
      expires: new Date(Date.now() + 86400000),
      // domain: "localhost:3000",
      sameSite: "none",
      secure: "true",
    },
  })
);

app.use(
  CORS({
    origin: "https://portfolio-coral-nine-37.vercel.app",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(Cookie());
app.use("/auth", Auth);
app.use("/api", hero);
app.use("/api", about);
app.use("/api", project);
app.use("/api", skill);
app.use("/api", contact);

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
// upload.
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});

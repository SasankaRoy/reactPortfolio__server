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
app.use("/image", express.static(path.join(__dirname, "public/images"))); //image link

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
      sameSite: "none",
      secure: "true",
    },
  })
);

app.use(
  CORS({
    origin: [
      "https://portfolio-coral-nine-37.vercel.app",
      "https://portfolio-sasanka.vercel.app",
      "http://localhost:3000",
      "http://192.168.29.68:3000",
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(Cookie());
app.use("/auth", Auth); //the auth's router
app.use("/api", hero); // hero page router
app.use("/api", about); // hero page router
app.use("/api", project); // project page router
app.use("/api", skill); // skill page router
app.use("/api", contact); // contact page router

// image uploader storage...

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
// upload route...
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

// listenning to the server

app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});

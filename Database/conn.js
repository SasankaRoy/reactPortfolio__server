const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("dataBase is connected  yoo !");
  })
  .catch((err) => {
    console.log(err);
  });

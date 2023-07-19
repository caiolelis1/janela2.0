const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/files", (req, res) => {
  fs.readdir("./../public/files", (err, paths) => {
    if (err) {
      console.log(err);
      return;
    }

    return res.send(paths);
  });
});

app.listen(3004, () => console.log("Server is running on port 3003"));

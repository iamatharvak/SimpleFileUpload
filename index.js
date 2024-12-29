const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const PORT = 5001;
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage", { title: "Document" });
});
app.get("/upload", (req, res) => {
  return res.json({
    error: "This is post route",
  });
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log("user", req.body);
  console.log(req.file);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

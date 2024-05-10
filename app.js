const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

morgan("dev");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
// app.use(myMiddleware);
// app.use(cors());

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// function myMiddleware(request, response, next) {
//   console.log("myMiddleware was called!");
//   // Access the request information
//   console.log("request ->", request);

//   // Modify request by adding new data to `request` object
//   request.secretValue = "swordfish";
//   next();
// }
app.get("/home", cors(corsOptions), (request, response, next) => {
  // console.log(request);
  response.sendFile(__dirname + "/views/home.html");
});

app.get("/cat", cors(corsOptions), (request, response, next) => {
  // response.sendFile(__dirname + "/views/cat-page.html");
  response.json({ message: "hello" });
});

// app.get("/test", (req, res) => {
//   let mySecret = req.secretValue;
//   res.send(mySecret);
// });
app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});
app.listen(3000, () => {
  console.log("port on 3000");
});

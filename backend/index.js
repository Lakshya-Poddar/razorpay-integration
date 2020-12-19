const app = require("express")();
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID, // Put the key id of the razorpay api
  key_secret: process.env.KEY_SECRET, //Put the key secret of the razorpay api
});
app.use(cors());
app.use(bodyParser.json());
//Set up cors for production to allow limit access

// const corsOptions = {
//   origin: "http://localhost:3000", //from where the req will be made i.e. the frontend
//   optionsSuccessStatus: 200, // for legacy browser support
// };
// app.use(cors(corsOptions));

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/verification", (req, res) => {
  const secret = "12345678";
  console.log(req.body);
  const crypto = require("crypto");
  const shaSum = crypto.createHmac("sha256", secret);
  shaSum.update(JSON.stringify(req.body));
  const digest = shaSum.digest("hex");
  if (digest == req.headers["x-razorpay-signature"]) {
    console.log("Legit request");
  } else {
    console.log("Wrong request");
  }
  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 49900;
  const currency = "INR";
  const options = {
    amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  const response = await razorpay.orders.create(options);
  console.log(response);
  res.json({
    id: response.id,
    currency: "INR",
    amount: response.amount,
  });
});
app.listen(1338, () => console.log("listening on port 1338"));

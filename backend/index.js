const app = require("express")();
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");
require("dotenv").config();
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID, // Put the key id of the razorpay api
  key_secret: process.env.KEY_SECRET, //Put the key secret of the razorpay api
});
app.use(cors());

//Set up cors for production to allow limit access

// const corsOptions = {
//   origin: "http://localhost:3000", //from where the req will be made i.e. the frontend
//   optionsSuccessStatus: 200, // for legacy browser support
// };
// app.use(cors(corsOptions));

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
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
app.listen(1337, () => console.log("listening on port 1337"));

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: "rzp_live_SV68ifsBjM5tPz",
    key_secret: "SgbxfFQuVn0Vdryt5nB0oxBt"
});

// Create order
app.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // convert to paise
        currency: "INR",
        receipt: "receipt_" + Date.now()
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
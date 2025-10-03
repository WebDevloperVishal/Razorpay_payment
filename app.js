const express = require('express');
const Razorpay = require('razorpay');
const path = require('path');
const Dotenv = require('dotenv'); 
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const { error } = require('console');
const app = express()


Dotenv.config();


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index', { key: process.env.RAZORPAY_KEY_ID })
})

// Creta Order Route
app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: "receipt_" + Date_Now(),
        }

        const order = await Razorpay.order.create(options)
        res.json(order);

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

app.post("/verify-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret)

        if (isValidSignature) {
            res.status(200).json({ status: "ok" })
            console.log('Payment Verfication Successful');
        } else {
            res.status(400).json({ status: "Verfication Failed" })
            console.log('Payment Verfication Failed');
        }

    } catch (err) {
        res.send(500).send({ error: err.message })
    }
})

app.get('/payment-success',  (req,res)=> {
    res.sendFile(path.join(__dirname, "views/success.html"))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
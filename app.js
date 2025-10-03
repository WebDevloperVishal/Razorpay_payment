const express = require('express');
const Razorpay = require('razorpay');
const path = require('path');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const {error} = require('console');
const app = express()
const port = 3000

Dotenv.config();


app.use("view engine" , "ejs")
app.use(express.json())
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index', { key: process.env.RAZORPAY_KEY_ID})
})

// Creta Order Route
app.post("/create-order", async(req,res) => {
    try {
        const options ={
            amount: req.body.amount,
            currency: "INR",
            receipt: "receipt_" + Date_Now(),
        }

        const order = await Razorpay.order.create(options)
        res.json(order);
        
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});
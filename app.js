const express = require('express')
const app = express()
const port = 3000


app.use("view engine" , "ejs")
app.use(express.json())
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index', { key: process.env.RAZORPAY_KEY_ID})
})

// Creta Order Route
app.post("/create-order", async(req,res) => {
    
})

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});
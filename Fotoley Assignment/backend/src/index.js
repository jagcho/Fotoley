const express = require("express")
const bodyParser = express.json()
const mongoose = require("mongoose")
const route = require("./routes/route")
const app = express()
// const multer= require("multer");


app.use(bodyParser)
// app.use( multer().any())


mongoose.connect("mongodb+srv://Jagcho:71nEXJtXcYfVx8T6@cluster0.5bg4mzz.mongodb.net/Fotoley", {
    useNewUrlParser: true
})
    .then(() => console.log('mongoDb is connected'))
    .catch((error) => console.log(error));

app.use("/", route)



app.listen(5000, function () {
    console.log("Express app running on port " + 5000);
});
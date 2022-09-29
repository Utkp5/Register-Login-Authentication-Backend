const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


const dotenv = require('dotenv');
dotenv.config();


app.get("/", function(req,res) {
    return res.send("WORKING FINE");
});



app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Server is Successfully run on PORT : ${PORT}`);
})

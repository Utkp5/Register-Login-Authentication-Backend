const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const logger = require("morgan");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");


const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require("./service/dbConfig");
dbConfig();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));



app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);







app.get("/", function(req,res) {
    return res.send("WORKING FINE");
});


app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Server is Successfully run on PORT : ${PORT}`);
})

const express = require("express");
const cors = require("cors");
const sequelize = require("./database/connection");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const app = express();

// USING ALL MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

// HANDLING THE PRODUCTION BUILD FOR HEROKU
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", function(req, res) {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
};
// LISTENING TO BACKEND PORT
sequelize.sync()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Express server started on ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});
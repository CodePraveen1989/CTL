const express = require("express")
const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoutes")


const jwt = require("jsonwebtoken");
/* logout */
app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").send("access token cleared");
  });
/* login */
app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    } catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
})

// this is going to be handled by product routes, that we declared above the cleared and imported above
//用来整合上方，declared的以及imported
// 如果访问进来的url，是/products，则被下面的handle
app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)

module.exports = app

const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "erock1357",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 30,
        },
    })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const cartRoutes = require("./routes/cart.routes.js");
const homeRoutes = require("./routes/home.routes.js");
app.use("/cart", cartRoutes);
app.use("/home", homeRoutes);

app.get(["/home", "/"], (req, res) => {
    if (!req.session.userVisitCount) req.session.userVisitCount = 1;
    else req.session.userVisitCount++;
    res.render("index", { count: req.session.userVisitCount });
});

app.listen(3000);

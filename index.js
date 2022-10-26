const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require('cookie-session')

const routes = require("./routers/route")

const app = express();
app.set('trus proxy', true)
app.use(cors());
app.use(bodyParser.json());
app.use(cookieSession({
    signed: false,
    secure: false
}))
app.use(routes)

const port = process.env.PORT || 9000

console.log("this is authentication")

app.listen(port);
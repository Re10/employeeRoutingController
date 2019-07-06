import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import { UserController } from "./UserController";
import { AuthController } from "./controller/auth";
import { empController } from "./controller/empCtrl"
import express = require("express");
var cors = require('cors');


// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
   controllers: [UserController, AuthController,empController
   ] // we specify controllers we want to use
});
//CORS middleware
var allowCrossDomain = function (req, res, next) {
   res.header('Access-Control-Allow-Origin', 'example.com');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');

   next();
}


app.use(allowCrossDomain);
app.use(express.static('uploads'));

// run express application on port 3000
app.listen(4000);
console.log("Listening to prot 4000");
// import * as mongoose from "mongoose";
import mongoose = require('mongoose');

  mongoose.connect(
    "mongodb://localhost:27017/employeedb",
    { useNewUrlParser: true },
    err => {
      if (!err) {
        console.log("mongodb connected successfully----------");
      } else {
        console.log("mongodb connect:" + JSON.stringify(err, undefined, 2));
      }
    }
  );
  
  export { mongoose };

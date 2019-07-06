
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, Res } from "routing-controllers";
import { regi } from "../model/regi";
import { create } from "domain";
import { response } from "express";
import { request } from "http";
import { emp } from "../model/emp";
import * as mongo from "mongodb";
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var nodeMailer = require('nodemailer');
@JsonController()
export class AuthController {

    @Post("/regi/")
    async create(@Body() emp: any, @Req() request: any, @Res() response: any) {
        console.log("Within create function", emp);
        let hashing = bcrypt.hashSync(request.body.pass, 10);
        request.body.pass = hashing;
        console.log("HASHING:", request.body.pass);
        console.log("Email:", request.body.email);
        let result = await regi.findOne({ email: request.body.email });
        console.log("Employee:", result);
        if (result) {
            console.log("Email is already present ");
        }
        if (!result) {
            console.log("No email FOund:");
            let data = await regi.create(emp);
            console.log(data);
            if (!data) {
                return console.log("Error");
            }
            if (data) {
                return response.send({ doc: data });
            }


        }

    }

    @Post("/regies/:id")
    async  login(@Body() emp: any, @Req() request: any, @Res() response: any) {
        console.log("Within Login function", emp);
        let result: any = await regi.findOne({ email: request.body.email });
        console.log("Reulst::", result);
        console.log("===Result if condition idd: ===", result.pass);
        if (result) {
            console.log("===Result if condition ===");

            let compareData = await bcrypt.compare(request.body.pass, result.pass);
            if (compareData) {
                let payload = { subject: result.pass };
                let token = jwt.sign(payload, 'secretkey');
                console.log("Token ", token);
                return response.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
        }


    }
    @Post("/for/")
    async forgetPass(@Body() employee: any, @Req() request: any, @Res() response: any) {
        console.log("within postbhjj");
        console.log("within forgot pass", employee);
        // console.log("Id::::",id);
        let data: any = await regi.findOne({ email: request.body.email });
        console.log("Reulst::", data);
        console.log("Reulst Email::", data.email);
        console.log("Reulst Email::", data._id);
        const encryptedString = cryptr.encrypt(data._id);
        console.log("encrypted id=:", encryptedString);
        if (data) {
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: data.email,
                    pass: 'ygqzevxizjvmnopd'
                }
            });
            let mailOptions = {
                from: data.email, // sender address
                to: "rekhagaware10@gmail.com", // list of receivers
                subject: "link check", // Subject line
                text: "some text here", // plain text body
                html: "file:///home/am-n6/Rekha/employee/angularjs/index.html#!/forgot/" + encryptedString // html body
            };
            let sendMail = await transporter.sendMail(mailOptions);
            console.log('Message %s sent: %s', sendMail);
            return response.status(200).json({
                message: 'message send Successful',

            });
        }

    }
    @Put("/regi/:id")
    async resetPass(@Param("id") id: number, @Body() employee: any, @Req() request: any, @Res() response: any) {
        console.log("within reset function");
        console.log("Reset Pass id::", id);
        console.log("Employeeeeee:", employee);
        console.log("emppasssssss:", employee.pass);
       
        //console.log("regiiiidddd",regiid);
        const decryptedString = cryptr.decrypt(id);
        console.log("decrepted data:", decryptedString);
        var hash = bcrypt.hashSync(employee.pass, 10);
        console.log("hassing ",hash);
        let data: any = await regi.findOne({ '_id': decryptedString });
        console.log("data issssss", data);
         data.pass = hash;
        // var token = {
        //     pass :hash
        // }
        console.log("hassing pass data",data);
        //  var regiid = new mongo.ObjectID(id);
        //   console.log("regiiiidddd",regiid);
       
        var result =await regi.collection.update({'_id':new  mongo.ObjectID(id)},{$set:data.pass});
        console.log("Result =>",result);
        // return response({
        //     message:"password updated successfully",
        //     doc:result
        // })
    }
}
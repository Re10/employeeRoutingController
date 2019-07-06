
import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { emp } from "../model/emp";
import { create } from "domain";
import { response } from "express";
import * as mongo from 'mongodb';


var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req: any, file: any, callback: any) {
        callback(null, './uploads');
    },
    filename: function (req: any, file: any, callback: any) {
        callback(null, file.originalname);
        console.log("file original name:", file.originalname);
    }
});

var upload = multer({ storage: storage });

@JsonController()
export class empController {


    @Post("/emp/")
    async addEmp(@UploadedFile('file', { options: upload }) file: any, @Body() employee: any, @Req() request: any, @Res() response: any) {
        console.log("Within AddEmp function", employee);
        console.log("FIle:", file.path);
        var filepath = file.path;
        console.log("FIle:", filepath);

        var employess = new emp({
            fname: employee.fname,
            lname: employee.lname,
            email: employee.email,
            mob: employee.mob,
            dob: employee.dob,
            addr: employee.addr,
            state: employee.state,
            city: employee.city,
            zip: employee.zip,
            gender: employee.gender,
            hobbies: employee.hobbies,
            skills: employee.skills,
            salary: employee.salary,
            myImg: filepath
        })
        console.log("Employeeee Recorddd:", employess);
        let data = await emp.create(employess);
        console.log("DATA", data);
        return response.status(200).json({
            message: 'data get Successfully',
            doc: data
        });


    }
    @Get("/emp/")
    async getEmp(@Body() employee: any, @Req() request: any, @Res() response: any) {
        let result = await emp.find();
        if (result) {
            console.log(result);
            return response.status(200).json({
                message: 'data get Successfully',
                doc: result
            });
        }
    }
    @Get("/emp/:id")
    async getOneEmp(@Param ("id") id: number,@Body() employee: any, @Req() request: any, @Res() response: any) {
        console.log("EMployeeeeee:",id);
        let result:any=await emp.findById(id);
        console.log("Resultt:",result);
        return response.status(200).json({
            message: 'data get Successfully',
            doc: result
        });
     
    }
    @Put("/emp/:id")
    async editEmp(@UploadedFile('file', { options: upload }) file: any,@Param ("id") id: number, @Body() employee: any, @Req() request: any, @Res() response: any){
        console.log("Within put function",employee);
        var empid = new mongo.ObjectID(id);
        var filepath = file.path;
        console.log("FIle:", filepath);
        console.log("Response",response);
        let result:any=await emp.findById(id);
        console.log("ReSULLLLLLLLLLLLLLLLLLLLL",result);
        result.fname=employee.fname,
        result.lname=employee.lname,
        result.email=employee.email,
        result.mob=employee.mob,
        result.dob=employee.dob,
        result.addr=employee.addr,
        result.state=employee.state,
        result.city=employee.city,
        result.zip=employee.zip,
        result.gender=employee.gender,
        result.hobbies=employee.hobbies,
        result.skills=employee.skills,
        result.salary=employee.salary,
        result.myImg=filepath
        console.log("result==>",result);

        var data =await emp.collection.updateOne({_id:empid},{$set:result});
      
        return response.status(200).json({
            message: 'data get Successfully',
            doc: data
        });
    }
    @Delete("/emp/:id")
    async removeEmp(@Param ("id") id: number,@Body() employee: any, @Req() request: any, @Res() response: any){
        console.log("within remove function");
        var empid = new mongo.ObjectID(id);
        let result= await emp.deleteOne({_id:empid});
        return response.status(200).json({
            message: 'data deleted Successfully',
            doc: result
        });
    }
}
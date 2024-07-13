const express = require("express");

const app = express();

app.use(express.text());

app.get("/" , (req , res)=>{
    res.send("Hello");
})


//methods
app.get("/method" , (req , res) => {
    const data = req.body;
    console.log(data);
    res.send("Get method");
})
app.post("/method" , (req , res) => {
    res.send("post method");
})
app.put("/method" , (req , res) => {
    res.send("put method");
})
app.patch("/method" , (req , res) => {
    res.send("patch method");
})
app.delete("/method" , (req , res) => {
    res.send("delete method");
})


//params and query
app.get("/users" ,(req , res)=>{
    res.send("users");
})

app.get("/users/:id" , (req , res) =>{
    let {id} = req.params;
    let {name , email} = req.query;
    res.send("users id: " + id  + " name : "+name +" email : "+email );

    console.log(id+" ");
    console.log(" name : "+name +" email : "+email );
})

//subroute
const admin = express.Router();
const student = express.Router();

app.use("/admin" , admin);
app.use("/student" , student);

admin.get("/home" ,(req , res , next)=>{
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.path);
    res.send("Admin home Route");
})

student.get("/home" ,(req , res , next)=>{
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.path);
    res.send("student home Route");
})

app.get("/home" ,(req , res , next)=>{
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.path);
    res.send("common home Route");
})

//cookie
//npm i cookie-parser
const cookieParser = require("cookie-parser");
const { name } = require("ejs");
app.use(cookieParser());
app.get("/cookieexample" , (req , res)=>{
    const cookies = req.cookies;
    res.cookie("name","hariharan");
    // res.cookie("age","21");
    res.clearCookie("age");
    console.log(cookies);
    res.send("Example Cookie");
})

//req object
app.get("/reqobject" , (req ,res)=>{
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.secure);

    console.log(req.accepts()); //accept in header
    console.log(req.get("Accept")); //another method

    res.send("Req Object");

})


//res object
app.get("/resobject" , (req,res)=>{
    
    // res.end() //send empty response

    // res.json({
    //     name:"hariharan",
    //     email:"hariharan0033@gmail.com"
    // }) //send json response

    res.redirect("/redirect");
        res.set("title", "express"); //set res header key,value
        const headerTitle = res.get("title");
        console.log(headerTitle);
        res.send("Res Object"); //send response
    // res.send("<h1>Hello</h1>");//send html content
})
app.get("/redirect",(req,res)=>{
    res.send("redirected to this route");
})

app.get("/view" , (req,res)=>{
    res.render("pages/hello.ejs");
})
app.get("/dynamicview" , (req,res)=>{
    res.render("dynamic.ejs" , {name:"Hariharan" , email:"hariharan0033@gmail.com"});
})


//send response according to the accept 
app.get("/format" , (req,res)=>{
    res.format({
        "text/plain" :()=> res.send("text response sent") ,
        "application/json" :()=> res.json({ name : "hariharan" , age : 21}),
        "text/html" : ()=>res.render("pages/hello.ejs"),
        default : ()=>res.send("Nothing Sent")
    })
})


//status code
app.get("/statuscode" , (req , res)=>{
        // res.sendStatus(200);  //send word info of code Like "OK"
        res.status(200);
        res.send("Status code example") // or res.status(200).send("status code example")
        
})


//middlewares
const middleware1 = (req, res , next) =>{
    console.log("middleware 1");
    next();
}
const middleware2 = (req, res , next) =>{
    console.log("middleware 2");
    res.send("stop at 2")
}
const middleware3 = (req, res , next) =>{
    console.log("middleware 3");
    next();
}
const middleware4 = (req, res , next) =>{
    console.log("middleware 4");
    next();
}
//middleware with parameter
const middleware5 = (obj) =>{
    return (req,res,next) =>{
        res.send(obj.name +"  "+obj.email);
    }
}
// app.use(middleware5({name:"hariharan" , email:"harihara0033@gmail.com"}));
//app level middleware
// app.use(middleware1); //midleware run in following order
// app.use(middleware2); //next of 1
// app.use(middleware3); //next of 2
// app.use(middleware4); //next of 3
app.get("/middleware" , (req ,res)=>{
    res.send("middleware example");
})
//route level middleware
app.get("/routemiddleware" , middleware3 , (req,res)=>{
    console.log("route middleware");
    res.send("route level middleware example");
})

//error handling middleware
const errorMiddleware = (req ,res ,next) => {
    throw new Error("error from middleware");
}
app.use(errorMiddleware);
const errorHandlerMiddleware = (error , req ,res ,next ) =>{
    res.status(500).send("Error Handling Middleware")
    console.log(error.message);
}
app.use(errorHandlerMiddleware);
app.get("/errormiddleware" , (req,res)=>{
    res.send("Hello");
})


app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
})
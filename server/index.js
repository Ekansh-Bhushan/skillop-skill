const express = require('express');
require("./db/config");
const User = require("./db/user");
const Mentor = require("./db/mentor");
const Order = require("./db/orders");
const cors = require('cors');
const mentor = require('./db/mentor');
// const Razorpay = require('razorpay'); 

const Jwt = require("jsonwebtoken");
const jwtKey = "xrsesygu yt76eqwxdxdf yugyft";

// const razorpayInstance = new Razorpay({
//     key_id: rzp_test_MVadiHBSTMrLpN,
//     key_secret: LtulAkdVCpivksuw520pKg33
// });


const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());

function authVerification(req, res, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.log("middleware called!", token);
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                console.log("auth NOT success");
                res.status(401).send({result:"Invalid Token"})
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result:"Token not found"})
    }
}

app.post('/isAuth', (req, res)=>{
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                res.status(401).send({result:"invalid"});
            }else{
                res.status(200).send({result: "success"});
            }
        })
    }else{
        res.status(403).send({result:"Token not found"})
    }
})

app.get('/', (req, res)=>{
    res.send("hello");
    res.end();
})

app.post('/mentor/signup', async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        console.log(req.body["userType"]);
        console.log("wrong entry!");
        res.send({
            result : "wrong user type",
            
        })
        
    }
    const doesMentorExist = await Mentor.findOne({
        '$or':[
            {email:req.body.email},
            {phoneNumber:req.body.phoneNumber}
        ]
    });
    if(doesMentorExist){
        res.send({result: "An account with same email or phoneNumber already exist"});
    }else{
        try{
            let mentor = new Mentor();
        mentor.fullname = req.body.fullname;
        mentor.email = req.body.email;
        mentor.phoneNumber = req.body.phoneNumber;
        mentor.password = req.body.password;
        
        let result = await mentor.save();
        result = result.toObject();
        // delete result.password;
        
        Jwt.sign({result}, jwtKey, (err, token)=>{
            if(err) {
                res.status(401).send({result: "Some thing went wrong"});
            }
            else {
                res.send({result, auth: token});
            }
            
        })
        } catch(err){
            res.status(500).send({result:err})
        }
        
    
    }
    
})

app.post('/mentor/update/expertise',authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "expertise": req.body.expertise.split(",").map((element) => {
                    return element.trim();
                })
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/pastExp', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "pastExp": req.body.pastExp
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/about', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "about": req.body.about
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/futurePlans', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "futurePlans": req.body.futurePlans
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/step1', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "step1": true
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/slots', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "availabilityString":req.body.availabilityString,
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/step2', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "step2": true
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/linkedinId', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "linkedinId":req.body.linkedinId,
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/upiId', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "upiId":req.body.upiId,
            }
        }
    );
    res.send(result);
})

app.post('/mentor/update/step3', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentor"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await Mentor.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "step3": true
            }
        }
    );
    res.send(result);
})

app.post('/mentee/signup', async (req, res)=>{
    const doesMentorExist = await Mentor.findOne({
        '$or':[
            {email:req.body.email},
            {phoneNumber:req.body.phoneNumber}
        ]
    });
    if(doesMentorExist){
        res.send({result: "An account with same email or phoneNumber already exist"});
        return;
    }
    let user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.password = req.body.password;
    
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, (err, token)=>{
        if(err) res.send({result: "Some thing went wrong"});
        else res.send({result, auth: token});
    })
})



//////////////
app.post('/mentee/update/expertise',authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "expertise": req.body.expertise.split(",").map((element) => {
                    return element.trim();
                })
            }
        }
    );
    res.send(result);
})

app.post('/mentee/update/pastExp', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "pastExp": req.body.pastExp
            }
        }
    );
    res.send(result);
})

app.post('/mentee/update/about', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "about": req.body.about
            }
        }
    );
    res.send(result);
})

app.post('/mentee/update/futurePlans', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "futurePlans": req.body.futurePlans
            }
        }
    );
    res.send(result);
})

app.post('/mentee/update/step1', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "step1": true
            }
        }
    );
    res.send(result);
})
//////////////

app.post('/mentee/update/linkedinId', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "linkedinId":req.body.linkedinId,
            }
        }
    );
    res.send(result);
})

app.post('/mentee/update/upiId', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    console.log(req.body);
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "upiId":req.body.upiId,
            }
        }
    );
    res.send(result);
})
app.post('/mentee/update/step3', authVerification, async (req, res)=>{
    if(req.body["userType"]!="mentee"){
        res.send({result: "send valid data"})
        return;
    }
    let result = await User.updateOne(
        {email:req.body.email}, 
        {
            $set:{
                "step3": true
            }
        }
    );
    res.send(result);
})
/////////////

app.post('/login', async (req, res)=>{
    if(req.body.password && req.body.email &&req.body.userType){
        if((req.body["userType"]=="mentor")){
            let mentor = await Mentor.findOne({email:req.body.email, password:req.body.password}).select("-password");
            if(mentor){
                Jwt.sign({mentor}, jwtKey,(err, token)=>{
                    if(err) res.send({result: "Some thing went wrong"});
                    else res.send({user: mentor, auth: token});
                })
            } else{
                res.send({result: "No user found"});
            }
            
        } else if((req.body["userType"]=="mentee")){
            let user = await User.findOne({email:req.body.email, password:req.body.password}).select("-password");
            if(user){
                Jwt.sign({user}, jwtKey,(err, token)=>{
                    if(err) res.send({result: "Some thing went wrong"});
                    else res.send({user: user, auth: token});
                })
            } else{
                res.send({result: "No user found"});
            }
        }
    } else{
        res.send({result: "All details not found"});
    }
    
})



// GetMentor
app.get("/getMentors", async (req, resp) => {
    const mentors = await Mentor.find({}).select("-password");
    if (mentors.length > 0) {
        resp.send(mentors)
    } else {
        resp.send({ result: "No Product found" })
    }
});


app.get("/mentor/:id", async (req, resp) => {
    let mentor = await Mentor.findOne({ _id: req.params.id }).select("-password");
    if (mentor) {
        resp.send(mentor)
    } else {
        resp.send({ "result": "No Record Found." })
    }
});

app.post("/order", async (req, res)=>{
    
    // const doesMentorExist = await Mentor.findOne({
    //     '$or':[
    //         {email:req.body.email},
    //         {phoneNumber:req.body.phoneNumber}
    //     ]
    // });
    // if(doesMentorExist){
    //     res.send({result: "An account with same email or phoneNumber already exist"});
    //     return;
    // }
    let order = new Order();
    order.mentor = req.body.mentor;
    order.mentee = req.body.mentee;
    order.day = req.body.day;
    order.slot = req.body.slot;
    
    let result = await order.save();
    res.send({result});
})


app.get("/getAllOrder", async (req, res)=>{
    const orders = await Order.find({});
    if (orders.length > 0) {
        orders.map(async element => {
            const user = await User.findOne({_id: element.mentee}).select("-password");
            return {...element, ...user};
        });
        res.send(orders);
    } else {
        rep.send({ result: "No Product found" })
    }
})

app.listen(PORT);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('db connected')
}
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    ic:String,
    name: String,
    aadhar: String,
    phone: String,
    gender: String,
    dob: String,
    RegistrationNo: String,
    DateofRegistration: String,
    registrationcerti: String,
    qualification: String,
    major: String,
});

const User1 = mongoose.model('User1', userSchema);
const User2 = mongoose.model('User2', userSchema);




const server = express();

server.use(cors());
server.use(bodyParser.json());

// CRUD - Create
server.post('/demo',async (req,res)=>{
     
    let user = new User1();
    user.username = req.body.username;
    user.password = req.body.password;
    user.ic = req.body.ic;
    user.name = req.body.name;
    user.aadhar = req.body.aadhar;
    user.phone = req.body.phone;
    user.gender = req.body.gender;
    user.dob = req.body.dob;
    user.RegistrationNo = req.body.RegistrationNo;
    user.DateofRegistration = req.body.DateofRegistration;
    user.qualification = req.body.qualification;
    user.major = req.body.major;
    const doc = await user.save();

    console.log(doc);
    res.json(doc);
})

server.post('/patient',async (req,res)=>{
     
    let user = new User2();
    user.ic = req.body.ic;
    user.name = req.body.name;
    const doc = await user.save();

    console.log(doc);
    res.json(doc);
})

server.get('/demo',async (req,res)=>{
    const docs = await User1.find({});
    res.json(docs)
})

server.get('/patient',async (req,res)=>{
    const docs = await User2.find({});
    res.json(docs)
})

server.listen(8080,()=>{
    console.log('server started')
})

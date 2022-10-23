const express=require('express')
const bodyparser=require('body-parser')
const { default: mongoose } = require('mongoose')
const app =express()

app.use(bodyparser.json())

const port=5000
const mongoURI="mongodb://localhost:27017/batch1learning"
mongoose.connect(mongoURI)
.then(res=> console.log("connection with mongoDB successful"))
.catch(err=>console.log("ERROR"))

const user= {
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
}

const User = mongoose.model('users',user)


app.get('/hello',(req,res)=>{
    res.send('Hello World!')
})
app.post('/register',(req,res)=>{
    console.log(req.body)
    const user1 = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        age:req.body.age
    })
    user1.save((err,result)=>{
        if(err){
            res.send("Error")
        }
        else{
            res.send("Added data")
        }
    })
})
app.get('/fetchUser',(req,res)=>{
    User.find({},(err,docs)=>{
        if(err){
            res.send('Error')
        }
        else{
            res.send(docs)
        }

    })
})

app.listen(port)
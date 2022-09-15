require("dotenv").config() 

const express = require("express") 
const mongoose = require("mongoose") 
const app = express() 
const students = require("./routes/students")
const Student = require("./models/studentschema") 
const PORT = process.env.PORT || 3000 
const cors = require("cors") 
app.use(cors()) 
mongoose.connect('mongodb+srv://Aravind-MongoDB:Aravind@cluster0.e3a9lly.mongodb.net/?retryWrites=true&w=majority/users', { useNewUrlParser: true})
const db = mongoose.connection 

db.on('error' , (error) => console.log(error) )
db.once('error' , () => console.log('connected to db') )

app.listen(PORT , () => {
     console.log(`Mowa app on ${PORT}`) 
})

app.use(express.json()) 

app.use("/api/students" , students) 


app.get("/api" , async (req , resp) => {
     try {
        let students = await Student.find() 
        resp.json(students) 
     } catch(e) { 
        resp.status(405).json( { message: e.message })
     }
})


app.post("/api/add" , async (req, resp) => {
     const student = new Student( {
         name: req.body.name , 
         email : req.body.email ,
         age: req.body.age 
     })
     try {
        const newStudent = await student.save() 
        resp.status(201).json(newStudent)   
     }catch(e) {
        resp.status(401).json({ status: "failed" , message: e.message })
     }

})


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/client/build/index.html'));
   });
}
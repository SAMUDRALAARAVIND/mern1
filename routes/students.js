const express = require("express") 
const mongoClient = require("mongoose")
const router = express.Router() 
const Student =require("../models/studentschema")

router.get("/hello" , (req, resp) => {
     resp.send("From router") 
})

router.post("/add" , async (req, resp) => {
     console.log("Adding a student") 
     try {
           let db = await Student.create(req.body) 
           resp.status(201).json({ message: "Added Data" , data: req.body})
     }
     catch(e) {
           resp.status(500).json({message: e.message })
     }
})


router.get("/all" , async (req, resp) => { 
      try{
          let data = await Student.find()
          resp.status(200).json({ message: "List of students" , data})
      }
      catch(e) {
          resp.status(500).json({ message: e.message })
      }
})
module.exports = router 
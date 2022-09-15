const mongoose = require("mongoose") 


const studentSchema = new mongoose.Schema({ 
     name: { 
        required: true , 
        type: String 
     } ,
     email : {
        type: String ,
        required : true 
     } , 
     age: { 
        type: Number ,
        required: true 
     }
})

module.exports = mongoose.model("Student" , studentSchema ) 
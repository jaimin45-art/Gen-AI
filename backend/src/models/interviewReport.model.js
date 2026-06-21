const mongoose = require('mongoose');

//job description :String
//Resume text:String
//Self Description:String

//matchScore:Number

//AI generated
//Techincal Question: [{
    //question: "",
    //intesntion:"",
    //answer:"",
//}]
//Behavioral Question: [{
    //question: "",
    //intesntion:"",
    //answer:"",
//}]
//Skill Gaps: [{
    //skill:"",
    //severity:{'
        //type:String,
        //enum:["low","medium","high"]
    //}
//}]
//preparation plan: [{
    //daay:Number,
    //focus:String,
    //tasks:[String]
//}]


//techincal question schema


const techincalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Techincal question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})


//behavioral question schema
const behavioralQuestionShema = new mongoose.Schema({
      question:{
        type:String,
        required:[true,"Techincal question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})


//skills gap schema
const skillsGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})


//preparation schema'
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:true
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    techincalQuestion:[techincalQuestionSchema],
    behavioralQuestion:[behavioralQuestionShema],
    skillsGap:[skillsGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamp:true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;

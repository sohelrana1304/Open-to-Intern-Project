// const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

// const { ObjectId } = require('mongodb')

const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    emmail:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    mobile{
        type:Number,
        unique:true,
        required:true
    },
    collegeId{
        type:ObjectId,
        ref:"college" //refred college collection
    },
    isDeleted{
        type:Boolean, default:false
    },


}, { timestamps: true });


module,exports= mongoose.model('intern',internSchema)
import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
    reportType:{
        type: String,
        required: true
    },
    itemName:{
        type: String,
        required: true,
        trim: true
    },
    location:{ 
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }

}, {timestamps: true});

export default mongoose.model('Report', reportSchema);
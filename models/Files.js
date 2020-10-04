const { Schema, model } = require('mongoose')

const fileSchema = new Schema({
    fileName : {
        type : String
    },
    file : {
        type : String,
        required : false,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
}, { timestamps : true })

const File = model('files', fileSchema)
module.exports = File
const {model,Schema} = require('mongoose')

const userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    age : {
        type : String,
        require : true
    }
})

module.exports = model('employees', userSchema);
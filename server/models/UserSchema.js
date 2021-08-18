const mongoose = require('mongoose')
const scrub = ({ password, ...user }) => user

const UserSchema = new mongoose.Schema({
    /*
    add whatever extra
    */
   name: {type: String, required: true},
   email: {type: String, required: true},
   address: {type: String, required: true},
   about: {type: String, required: false},
   password: {type: String, required: true},

})

/*const User = mongoose.model('User', UserSchema)
 used to add to the database
const user = new User({
    name: "test user",
   email: "test.user@email.com",
   address: "123 hello Rd",
   about: "I like to code",
   password: "password",
}) 
user.save().then(result => {
    console.log('user saved', user.name)
    mongoose.connection.close()
})*/
module.exports = mongoose.model('User', UserSchema)
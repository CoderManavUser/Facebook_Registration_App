const mongoose  =  require('mongoose');
const plm = require('passport-local-mongoose');


mongoose.set('strictQuery', false);

mongoose.connect('mongodb://0.0.0.0:27017/fb')
.then(function(){
    console.log("Database Connected")
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String
});

userSchema.plugin(plm);
module.exports = mongoose.model('user', userSchema);
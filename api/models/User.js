import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    balance: Number,
    location: {lat: String, long: String},
    friends: [{type: Schema.Types.ObjectId, ref: "user"}],
    events: {
        hosting: [{type: Schema.Types.ObjectId, ref: "event"}],
        attending: [{type: Schema.Types.ObjectId, ref: "event"}],
        declined: [{type: Schema.Types.ObjectId, ref: "event"}],
        invitedTo: [{type: Schema.Types.ObjectId, ref: "event"}]
    }
})

UserSchema.pre("save", function(next){
    const user = this

    if(!user.isModified('password')){return next()}

    const password = user.password
    const hash = bcrypt.hashSync(password,10)
    user.password = hash
    next()
})

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model("user", UserSchema)


export default User
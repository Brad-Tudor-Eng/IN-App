import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventSchma = new Schema({
    date: String,
    time: String,
    location: {lat: String, long: String},
    basePrice: Number,
    incentive: Number,
    people: {
        host: {type: Schema.Types.ObjectId, ref: "user"},
        attending: [{type: Schema.Types.ObjectId, ref: "user"}],
        declined: [{type: Schema.Types.ObjectId, ref: "user"}],
        invited: [{type: Schema.Types.ObjectId, ref: "user"}]
    }
        
    
})

const Event = mongoose.model("event", EventSchma)

export default Event
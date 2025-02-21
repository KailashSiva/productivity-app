const mongoose = require('mongoose')

// await mongoose.connect('mongodb://127.0.0.1/my_database');

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Task = require('./Task')

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})


const User = mongoose.models.User || mongoose.model('User', UserSchema)

module.exports = User;
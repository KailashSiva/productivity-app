const mongoose = require('mongoose')

// async function connectDB() {
//     await mongoose.connect('mongodb://127.0.0.1/my_database');
//     console.log('Connected');
// }
// connectDB().catch(console.error);


const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const TaskSchema = new Schema({
    task: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'], // Allowed values
        required: false,
    },
    dueDate: Date,
    completed: { type: Boolean, default: false }
})

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema)

module.exports = Task
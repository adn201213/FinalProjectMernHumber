import mongoose from 'mongoose'

const employeesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    imgSrc: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
});

const Employee = mongoose.model('Employee', employeesSchema);
export default Employee;
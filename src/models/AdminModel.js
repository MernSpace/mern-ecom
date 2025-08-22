const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    approve: { type: Boolean, default: false },
    phone: { type: String, required: true },
    photo: { type: String, require: true }
},
    { timestamps: true, versionKey: false }
)
const AdminModel = mongoose.model('admins', DataSchema)
module.exports = AdminModel
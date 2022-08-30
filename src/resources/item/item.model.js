import mongoose from "mongoose";

const itemShchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    status: {
        type: String,
        required: true,
        enum: [ 'active', 'complete', 'pastdue' ],
        default: 'active'
    },
    notes: String,
    due: Date,
    createdBy: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'user',
        required: true
    },
    list: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'list',
        required: true
    }
}, { timestamps: true })

itemShchema.index({ list: 1, name: 1 }, { unique: true })

export const Item = mongoose.model('item', itemShchema)
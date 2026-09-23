
import mongoose, { Schema, Document } from "mongoose";

export interface CommentTypes extends Document {
    productId: mongoose.Types.ObjectId
    userId: string
    comment: string
    userName: string
}

const CommentSchema = new Schema<CommentTypes>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index: true
    },
    userName:{
        type: String,
        required: true,
        default: "Anonymous"
    },
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        index: true
    }
}, { timestamps: true })

export default mongoose.models.Comment || mongoose.model<CommentTypes>("Comment", CommentSchema)
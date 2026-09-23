import mongoose, {Schema, Document} from "mongoose";

export interface ProductTypes extends Document{
    title: string
    price: number
    description: string
    image: string
    category?: string
    comments?: mongoose.Types.ObjectId[]
}

const ProductSchema = new Schema<ProductTypes>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["shirt", "shorts", "trousers", "jackets", "hoodies", "suits", "activewear"],    
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }]
})

export default mongoose.models.Product || mongoose.model<ProductTypes>("Product", ProductSchema)
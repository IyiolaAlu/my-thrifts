
import mongoose, {Schema, Document} from "mongoose";

export interface CartTypes extends Document{
    productId: mongoose.Types.ObjectId
    userId: string
    quantity: number
}

const CartSchema = new Schema<CartTypes>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    }
}, {timestamps:true})

export default mongoose.models.Cart || mongoose.model<CartTypes>("Cart", CartSchema)
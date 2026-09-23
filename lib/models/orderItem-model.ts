import mongoose, {Schema, Document} from "mongoose";

export interface OrderItemTypes extends Document{
    productId: mongoose.Types.ObjectId
    name: string
    image: string
    quantity: number
    price: number
    userId: string
}

const OrderItemSchema = new Schema<OrderItemTypes>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: { type: String, required: true},
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {type: String, required: true},
    userId: {
        type: String,
        required: true,
        index: true
    } 
}, {timestamps: true})

export default mongoose.models.OrderItem || mongoose.model<OrderItemTypes>("OrderItem", OrderItemSchema)
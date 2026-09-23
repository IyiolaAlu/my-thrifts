import mongoose, {Schema, Document} from "mongoose";

export interface OrderTypes extends Document{
    userId: string
    orderItems: mongoose.Types.ObjectId[]
}

const OrderShema = new Schema<OrderTypes>({
    userId: {
        type: String,
        required: true,
        index: true
    }
},{timestamps: true})

export default mongoose.models.Order || mongoose.model<OrderTypes>("Order", OrderShema)
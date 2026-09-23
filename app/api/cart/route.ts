import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Cart } from "@/lib/models"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const session = await getSession()
    if (!session) {
        return NextResponse.json({error: "Login or sign up"})
    }
    
    try {
        const carts = await Cart.find({userId: session?.user.id}).populate("productId")
        return NextResponse.json(carts)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch cart" },
            { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await connectDB()
    const session = await getSession()
    if (!session) {
        return NextResponse.json({error: "Login or sign up"})
    }
    const body = await request.json()
    const { productId, quantity = 1 } = body
    try {
        const userId = session.user.id
        const existingCartItem = await Cart.findOne({userId, productId})
        if (existingCartItem) {
            existingCartItem.quantity +=  Number(quantity)
            await existingCartItem.save()
            const populatedExisting = await Cart.findById(existingCartItem._id).populate("productId")
           return NextResponse.json(populatedExisting)
        }
        const cart = await Cart.create({userId, productId, quantity  })
        const populatedCart = await Cart.findById(cart._id).populate("productId")
        return NextResponse.json(populatedCart)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create cart" },
            { status: 500 })
    }
}


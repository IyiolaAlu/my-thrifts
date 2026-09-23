import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Cart } from "@/lib/models"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, {params}: {
    params: Promise<{id: string}>
}) {
    await connectDB()
    const session = await getSession()
    if (!session) {
        return NextResponse.json({error: "Login or sign up"})
    }
    const {id} = await params
    const body = await request.json()
    const { quantity } = body
    try {
        const userId = session.user.id
        if(quantity < 1){
            return NextResponse.json({ error: "Quantity cannot be less than 1" }, { status: 400 })
        }
        const cart = await Cart.findOneAndUpdate(
            {_id: id, userId}, 
            {quantity},
            { new: true }).populate("productId")
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update cart" },
            { status: 500 })
    }
}

export async function DELETE(request: NextRequest, {params}: {
    params: Promise<{id: string}>
}) {
    await connectDB()
    const session = await getSession()
    if (!session) {
        return NextResponse.json({error: "Login or sign up"})
    }
    const {id} = await params
    try {
        const userId = session.user.id
        const cart = await Cart.findOneAndDelete({_id: id, userId})
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete cart" },
            { status: 500 })
    }
}


import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Comment, Product } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB()
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({error: "Login to make this request"}, {status: 403})
        }
       
        const userId = session.user.id
        const body = await req.json()
        const { productId, comment} = body
        const newComment = await Comment.create({userId, userName: session?.user?.name, productId, comment})

        if (!newComment) {
            return NextResponse.json({error: "No commect found"}, {status: 404})
        }
        await Product.findByIdAndUpdate(productId,{
            $push: { comments: newComment._id}
        })
        console.log("SESSION USER:", session.user)
console.log("ABOUT TO SAVE:", { userId, userName: session.user.name, productId, comment })
        
        return NextResponse.json(newComment, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch comment" },
            { status: 500 }
        )
    }
}
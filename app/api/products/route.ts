import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Product } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB()
    try {
        const products = await Product.find()
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await connectDB()
    try {
        const session = await getSession()
        console.log(session);
        
                if (session?.user.role !== "admin") {
                    return NextResponse.json(
                        { error: "You are not authorised to make this action" },
                        { status: 403 }
                    )
                }
        const body = await request.json()
        const { title, price, description, category, image, comments } = body
        console.log("Received body:", body)
        const products = await Product.create({title, price, description, category, image, comments})
        revalidatePath("/dashboard")
        return NextResponse.json(products, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: "Fail to create product"},
            {status: 500}
        )
    }
}


import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Product } from "@/lib/models"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: {
    params: Promise<{ id: string }>
}) {
    await connectDB()
    const { id } = await params

    try {
        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest, { params }: {
    params: Promise<{ id: string }>
}) {
     await connectDB()
    const { id } = await params

    const { title, price, description, category, image } = await request.json()
    try {
       
        const session = await getSession()
        if (session?.user.role !== "admin") {
            return NextResponse.json(
                { error: "You are not authorised to make this action" },
                { status: 403 }
            )
        }
        const product = await Product.findOneAndUpdate({ _id: id }, { title, price, description, category, image }, {
            new: true
        })
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: {
    params: Promise<{ id: string }>
}) {
    await connectDB()
    const { id } = await params
    
    try {
        const session = await getSession()
        if (session?.user.role !== "admin") {
            return NextResponse.json(
                { error: "You are not authorised to make this action" },
                { status: 403 }
            )
        }
     const product = await Product.findOneAndDelete({ _id: id })

        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        )
    }
}
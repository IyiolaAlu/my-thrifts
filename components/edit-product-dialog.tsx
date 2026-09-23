"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "./ui/button"
import axios from "axios"
import { ProductTypes } from "@/lib/models/model-types"


interface EditProductDialogProps {
    product: ProductTypes | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onProductUpdated: (product: ProductTypes) => void
}
export default function EditProductDialogPage({ product, onOpenChange, open, onProductUpdated }: EditProductDialogProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        title: product?.title ?? "",
        price: product?.price ?? "",
        description: product?.description ?? "",
        category: product?.category ?? "",
        image: product?.image ?? ""
    })
    const [isUploading, setIsUploading] = useState(false)
    const categories = [
        { label: "Shirt", value: "shirt" },
        { label: "Shorts", value: "shorts" },
        { label: "Trousers", value: "trousers" },
        { label: "Jackets", value: "jackets" },
        { label: "Hoodies", value: "hoodies" },
        { label: "Suits", value: "suits" },
        { label: "Activewear", value: "activewear" },
    ]

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await axios.put(`/api/products/${product?._id}`, {
                title: form.title,
                price: form.price,
                description: form.description,
                category: form.category,
                image: form.image
            })
            if (!res.data) {
                setError("Cant update")
            } else {
                onProductUpdated(res.data)
                onOpenChange(false)
            }
        } catch (error) {
            setError("Cant update")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit Product
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                name="title" type="text" placeholder="Enter a title" />
                        </div>

                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                name="price" type="text" placeholder="Enter a price" />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                name="description" type="text" placeholder="Enter a description" />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val ?? "" })}>
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="image">Image</Label>
                            <CldUploadWidget
                                uploadPreset="ecommerce_uploads"
                                onSuccess={(result) => {
                                    const url = (result.info as { secure_url: string }).secure_url
                                    if (url) {
                                        setForm({ ...form, image: url })
                                        setIsUploading(false)
                                    }
                                }}
                                onQueuesStart={() => setIsUploading(true)}
                                onQueuesEnd={() => setIsUploading(false)}
                            >
                                {({ open }) => (
                                    <button
                                        type="button"
                                        onClick={() => open()}
                                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition"
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            "Uploading..."
                                        ) : form.image ? (
                                            "Image Uploaded ✅"
                                        ) : (
                                            "Click to Upload Image"
                                        )}
                                    </button>
                                )}
                            </CldUploadWidget>
                        </div>


                        <DialogFooter>
                            <Button onClick={() => onOpenChange(false)} type="submit">Cancle</Button>
                            <Button disabled={loading} type="submit">{loading ? "Updating Product..." : "Update Product"}</Button>

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
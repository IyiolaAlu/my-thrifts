"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductTypes } from "@/lib/models/model-types";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface ProductFormProps{
    onProductCreated?: (product: ProductTypes)=>void
}

export default function ProductForm({ onProductCreated }: ProductFormProps) {
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        console.log("Form data:", form)
        try {
            const res = await axios.post("/api/products", form)
            const data = res.data

            if (data.error) {
                setError(data.error)

                return
            }
            onProductCreated?.(data)
            setForm({ title: "", price: "", description: "", category: "", image: "" })
            console.log(data);

        } catch (err) {
            console.error(err)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>

            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Create Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                name="title"
                                type="text"
                                placeholder="Enter a title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                name="price"
                                type="text"
                                placeholder="Enter a price"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                name="description"
                                type="text"
                                placeholder="Enter a description"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={form.category}
                                onValueChange={(val) => setForm({ ...form, category: val ?? "" })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
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

                        <div className="space-y-2">
                            <Label>Image</Label>
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
                                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
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

                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full"
                        >
                            {loading ? "Creating Product..." : "Create Product"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </>
    )
}
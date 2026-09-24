"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCommentStore } from "@/lib/store/useCommentStore"
import { useEffect, useState } from "react";
import { ProductDetailsTypes } from "@/lib/models/model-types";
import { formatPrice } from "@/lib/utils/format";

interface ProductDetailsProps {
    product: ProductDetailsTypes
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const addToComment = useCommentStore((state) => state.onAddToComment)
    const [comment, setComment] = useState("")
    const loading = useCommentStore((state) => state.isLoading)
    const storeComments = useCommentStore((state) => state.comments)

    const allComments = [...(product.comments || []), ...storeComments]



    return (
        <>
            <div className="container max-w-7xl mx-auto p-5 flex justify-center">
                <div className="flex flex-col gap-5 w-100 md:flex-row md:gap-10 md:w-200">
                    <div className="flex flex-col gap-5 justify-between">
                        <Image
                            src={product.image}
                            height={350}
                            width={350}
                            alt={product.title}
                            className="relative  w-full aspect-square object-cover  "

                        />
                        <div className="grid w-full gap-2">
                            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Type your message here." />
                            <Button onClick={() => addToComment(product._id, comment)}>{loading ? "Sending Comment..." : "Comment"}</Button>
                        </div>
                    </div>
                    <div className="border border-[#D9D9D9] w-75 flex flex-col p-10 items-center gap-4">
                        <div>
                            <h1 className="uppercase font-bold text-[14px]">{product.title}</h1>
                            <h2 className="font-bold text-[14px]">{formatPrice(product.price)}</h2>
                            <p className="text-gray-600">{product.category}</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-[14px]">{product.description}</h3>
                        </div>

                        <div className="border-t w-full" />
                        <p className="font-bold">COMMENTS</p>
                        <div className=" overflow-y-scroll h-20">
                            <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                                {allComments.map((comment, key) => (
                                    <div key={key} className="flex items-start gap-3">    
                                        <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                            {comment.userName?.charAt(0).toUpperCase() || "?"}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {comment.userName || "Anonymous"}
                                            </p>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {comment.comment || "No Comment"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
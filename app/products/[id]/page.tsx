import ProductDeatails from "@/components/product-details";
import connectDB from "@/lib/db";
import { Product } from "@/lib/models";
import { ProductDetailsTypes } from "@/lib/models/model-types";

export default async function ProductDetailsPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    await connectDB()
    const productDoc = await Product.findById(id).populate("comments").lean() as ProductDetailsTypes
    if (!productDoc) {
        return <p>No details found</p>
    }
 
    const product = JSON.parse(JSON.stringify(productDoc)) as ProductDetailsTypes

    

    console.log(product)

    return (
        <>
            <div>
              <ProductDeatails product={product}/>
            </div>
        </>
    )
}
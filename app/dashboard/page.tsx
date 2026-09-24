"use client"
import CartPage from "@/components/cart-sheet";
import EditProductDialogPage from "@/components/edit-product-dialog";
import { CardImage } from "@/components/product-card";
import ProductForm from "@/components/product-form"
import { GetCartTypes, ProductTypes } from "@/lib/models/model-types";
import { useCartStore } from "@/lib/store/useCartStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [products, setProducts] = useState<ProductTypes[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const addToCart = useCartStore((state) => state.addToCart)

    async function fetchProducts() {
        setLoading(true)
        setError("")
        try {
            const res = await axios.get("/api/products")
            if (!res.data) {
                setError("no product found")
            } else {
                setProducts(res.data)
            }

        } catch (error) {
            console.error(error);
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])




    const handleDelete = async (id: string) => {

        const res = await axios.delete(`/api/products/${id}`)
        if (!res.data) {
            setError("Unable to delete product")
        } else {
            const deletedProd = products.filter((product) => product._id !== id)
            setProducts(deletedProd)
        }

    }

    const handleEdit = async (product: ProductTypes) => {
        setSelectedProduct(product)
        setIsEditDialogOpen(true)
    }



    return (
        <>
            <div className=" min-h-dvh mx-auto p-5 max-w-7xl">
                <div className="py-32 max-w-md w-full ">
                    <ProductForm onProductCreated={(newProduct) =>
                        setProducts((prev) => [...prev, newProduct])
                    } />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-6">
                    {loading ? (
                        <>
                           <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-black rounded-full" />
                           </>
                    ) : products.map((product: ProductTypes) => (
                        <CardImage
                            key={product._id}
                            _id={product._id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            category={product.category}
                            description={product.description}
                            onDelete={() => handleDelete(product._id)}
                            onEdit={() => handleEdit(product)}
                            onAddToCart={() => addToCart(product._id, 1)}
                        />
                    ))}
                </div>
            </div>

            <EditProductDialogPage
                key={selectedProduct?._id}
                product={selectedProduct}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onProductUpdated={(updatedProduct) => (
                    setProducts((currentProduct) =>
                        currentProduct.map((product) =>
                            product._id === updatedProduct._id
                                ? updatedProduct : product
                        )
                    )
                )}
            />

        </>
    )
}
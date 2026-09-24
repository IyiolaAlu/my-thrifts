"use client"
import { UserProductsCard } from "@/components/user-products-card";
import { ProductCardProps } from "@/lib/models/model-types";
import { useCartStore } from "@/lib/store/useCartStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomeCardProps } from "./home-card";
import { Input } from "@base-ui/react";
import { Label } from "./ui/label";
import { Search } from "lucide-react";
import { ProductSkeleton } from "./productShimmer";

export default function ProductsUserPage() {
     const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductCardProps[]>([])
    const [search, setSearch] = useState("")
   
    const [error, setError] = useState("")

    async function fetchProducts() {
        setLoading(true)
        try {
            const res = await axios.get("/api/products")
            if (!res.data) {
                setError("No data found")
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
        console.log("Fetching products...")
        fetchProducts()
    }, [])

    const addToCart = useCartStore((state) => state.addToCart)

    const searchTerm = search.trim().toLowerCase()
    const filteredProduct = products.filter((item) => {
        return item.category?.includes(searchTerm)
    })

    return (
        <>
            <div className="flex justify-center">
                <div className="relative flex justify-center items-center py-32 w-fit ">
                    <Label className="absolute left-2" htmlFor="search"><Search /></Label>
                    <span className="absolute right-5">search</span>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} id="search" type="text" className="w-60 h-11 md:w-91.75 md:h-12.5 bg-[#D9D9D9] pl-12" />
                </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-6">
                {
                    loading ? (
                        
                           <>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))}
                           </>
                      
                    ) : filteredProduct.map((item) => (
                        <HomeCardProps
                            _id={item._id}
                            key={item._id}
                            image={item.image}
                            title={item.title}
                            category={item.category}
                            description={item.description}
                            price={item.price}
                            onAddToCart={() => addToCart(item._id, 1)}
                        />
                    ))
                }
            </div>


        </>
    )
}

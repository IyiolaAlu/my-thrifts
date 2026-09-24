"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useCartStore } from "@/lib/store/useCartStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductTypes } from "@/lib/models/model-types";
import { HomeCardProps } from "./home-card";
import { ProductSkeleton } from "./productShimmer";

export default function HomeProducts() {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 2000, stopOnInteraction: true }),
    []
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [products, setProducts] = useState<ProductTypes[]>([])
  async function fetchProducts() {
    setLoading(true)
    try {
      const res = await axios.get("/api/products")
    if (!res.data) {
      setError("No data found")
    } else
      setProducts(res.data)
    } catch (error) {
      console.error(error);
      
    }finally{
      setLoading(false)
    }
      
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const newProducts = [...products]
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(0, 4)


  const addToCart = useCartStore((state) => state.addToCart)
  return (
    <>

      <section className="container mx-auto p-5 relative z-10">
        <div>
          <div className="text-gray-600">
            <p>MEN</p>
            <p>WOMEN</p>
            <p>KIDS</p>


          </div>
        </div>

        <div className="pt-10 flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-[35px] text-center leading-7 md:leading-10 font-bold md:text-[48px] md:text-left">AMAZING <br /> COLLECTIONS</h1>
              <p className="hidden md:flex md:text-gray-600 ">SUMMER <br /> 2026</p>
              <p className="flex text-gray-600 justify-center pb-5 md:hidden">SUMMER 2026</p>
            </div>

            <Link href="/products" className="flex p-5 items-center justify-between w-66.25 h-10 bg-[#D9D9D9] mb-5">
              Go to shop
              <ArrowRight />
            </Link>
          </div>
          <Carousel plugins={[plugin]}
            className="w-full max-w-40 sm:max-w-xs mx-auto md:mx-0"
            onMouseEnter={plugin.stop}
            onMouseLeave={plugin.reset}>
            <CarouselContent>
              {newProducts.map((product: ProductTypes) => (
                <CarouselItem key={product._id}>
                  <div className="p-1">
                    <Card className="p-0">
                      <CardContent className="relative flex aspect-square items-center justify-center p-6">
                        <Image
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          alt={product.title}
                          src={product.image} />

                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />

          </Carousel>
        </div>
      </section>

      <section className="container mx-auto py-10 md:py-32 px-5">
        <div>
          <div className="flex justify-between">
            <h1 className="leading-10 font-bold text-[40px]">NEW <br />THIS WEEK</h1>
            <Link href="/products" className="hover:underline text-gray-600">See All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
              loading ? (
                <>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </>
              ) :
                newProducts.map((product) => (
                  <HomeCardProps
                    _id={product._id}
                    key={product._id}
                    image={product.image}
                    category={product.category}
                    price={product.price}
                    description={product.description}
                    title={product.title}
                    onAddToCart={() => addToCart(product._id, 1)}
                  />
                ))
            }
          </div>
        </div>
      </section>


    </>
  )
}

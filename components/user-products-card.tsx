"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { ProductCardProps } from "@/lib/models/model-types"
import Link from "next/link"




export function UserProductsCard({_id, image, title, description, price, category, onAddToCart }: ProductCardProps) {

  
  return (
    <Card>

      <Image 
      loading="eager"
      src={image} 
      width={300}
      height={300}
      alt={title} 
      className="relative z-20 aspect-video w-full object-cover h-auto "/>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{category}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardTitle>{price}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        
            <Link href={`/products/${_id}`}>
        <Button>View Product</Button></Link>
        <Button onClick={onAddToCart} >Add to cart</Button>
        
      </CardFooter>
    </Card>
  )
}

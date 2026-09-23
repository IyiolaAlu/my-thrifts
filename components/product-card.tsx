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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Delete, DeleteIcon, Edit, EllipsisVertical, Menu, Trash, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils/format"


export function CardImage({ _id, image, title, description, price, category, onDelete, onEdit, onAddToCart }: ProductCardProps) {



  return (
    <Card className="relative pt-0">
      <Link href={`/products/${_id}`}>
      <Image
        loading="eager"
        src={image}
        width={300}
        height={300}
        alt={title}
        className="relative  aspect-square w-full object-cover h-auto " />
      </Link>
      
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{category}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardTitle>{formatPrice(price)}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">

       
        <Button onClick={onAddToCart} >Add to cart</Button>





      </CardFooter>
      <div className="absolute z-50 right-3 top-3">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Edit/>
                  <Button onClick={onEdit} variant="outline">Edit</Button>
                </div>
                <div className="flex gap-2 items-center">
                  <Trash2/>
                  <Button onClick={onDelete} variant="destructive">Delete</Button>
                </div>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}

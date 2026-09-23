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
import { GetCartTypesProps } from "@/lib/models/model-types"
import { Minus, Plus, Trash2 } from "lucide-react"




export function CartCard({ _id,quantity, productId, onDelete, onDecrease, onIncrease }: GetCartTypesProps) {


    return (
        <Card className="w-full flex flex-col sm:flex-row items-stretch gap-4 p-4 overflow-hidden">
 
      <div className="relative aspect-square w-full sm:w-28 sm:h-28 shrink-0 rounded-md overflow-hidden bg-muted">
        <Image
          src={productId.image}
          fill 
          sizes="(max-width: 640px) 100vw, 112px"
          alt={productId.title}
          className="object-cover object-center z-20"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">

        <CardHeader className="p-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <Badge variant="secondary" className="w-fit">{productId.category}</Badge>
              <CardTitle className="text-base font-semibold tracking-tight line-clamp-2">
                {productId.title}
              </CardTitle>
            </div>
            <span className="text-base font-bold text-foreground whitespace-nowrap">
              ${(productId.price * quantity).toFixed(2)}
            </span>
          </div>
          <CardDescription className="line-clamp-2 text-xs">
            {productId.description}
          </CardDescription>
        </CardHeader>

   
        <CardFooter className="p-0 flex items-center justify-between mt-auto">
      
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={onDecrease}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={onIncrease}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

        
          <Button onClick={onDelete} variant="destructive" size="sm" className="gap-1.5 h-8 px-3">
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </CardFooter>

      </div>
    </Card>
    )
}

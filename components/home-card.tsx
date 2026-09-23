"use client"
import Image from "next/image"
import { ProductCardProps } from "@/lib/models/model-types"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useSession } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils/format"


export function HomeCardProps({ _id, image, title, description, price, category, onAddToCart }: ProductCardProps) {

  const { data: session } = useSession()
  const router = useRouter()


  return (
    <div>
      <div className="relative">
        <Link href={`/products/${_id}`}  >
          <Image
            src={image}
            height={300}
            width={300}
            alt={title}
            className="relative z-60 hover:scale-125 w-full aspect-square object-cover  "
          />

        </Link>
        <span className="absolute z-80 top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{category}</span>
      </div>

      <div className="flex justify-between mt-2">
        <div className="">
          <span className="text-sm text-gray-600">{title}</span>
          <p className="font-bold">{description}</p>
        </div>
        <div className="flex flex-col justify-between">
          <Plus onClick={() => {
            if (!session?.user) {
              router.push("/login")
              return
            }
            onAddToCart?.()
          }} className="cursor-pointer size-5 bg-[#DCDCDC] text-gray-400 active:bg-black active:text-white hover:text-gray-900" />
          <p className="font-bold">{formatPrice(price)}</p>
        </div>
      </div>

    </div>
  )
}

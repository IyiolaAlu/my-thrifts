"use client"

import { Menu, ShirtIcon, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { signOut, useSession } from "@/lib/auth/auth-client"
import { usePathname, useRouter } from "next/navigation"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store/useCartStore"
import { useEffect, useState } from "react"
import { CartCard } from "./cart-card"


export default function Navbar() {
    const { data: session, isPending } = useSession()
    const router = useRouter()
    const getCart = useCartStore((state) => state.getCart)
    const cart = useCartStore((state) => state.cart)
    const deleteCartItem = useCartStore((state) => state.removeFromCart)
    const updateQuantity = useCartStore((state) => state.updateCartQuantity)

    const pathName = usePathname()
    useEffect(() => {
        if (!isPending && session) {
            getCart()
        }
    }, [session, isPending, getCart])

    const incQuantity = async (id: string, quantity: number) => {
        await updateQuantity(id, quantity + 1)

    }
    const decQuantity = async (id: string, quantity: number) => {
        await updateQuantity(id, quantity - 1)
    }

    return (
        <>
            <nav>


                <div className="container mx-auto h-16 flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="md:hidden flex">
                            <DropdownMenu>
                                <DropdownMenuTrigger >
                                    <Menu />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel></DropdownMenuLabel>
                                        <DropdownMenuItem className={pathName === "/" ? "bg-black font-bold text-white" : "text-gray-500"}>
                                            <Link href="/">Home</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={pathName === "/dashboard" ? "bg-black font-bold text-white" : "text-gray-500"}>
                                            {
                                                session?.user?.role === "admin" && (
                                                    <Link href="/dashboard" className={pathName === "/dashboard" ? "bg-black font-bold text-white p-0.5 rounded" : "text-gray-500"}>Dashboard</Link>
                                                )
                                            }
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={pathName === "/products" ? "bg-black font-bold text-white" : "text-gray-500"}>
                                            <Link href="/products">Collections</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {/* <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Team</DropdownMenuItem>
                                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                                        </DropdownMenuGroup> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <h1 className="font-bold text-3xl">StyleWears</h1>
                    </div>
                    <div className="hidden md:flex md:gap-3">
                        <Link href="/" className={pathName === "/" ? "bg-black font-bold text-white px-2 rounded" : "text-gray-500"}>Home</Link>
                        <Link href="/products" className={pathName === "/products" ? "bg-black font-bold text-white px-2 rounded" : "text-gray-500"}>Collections</Link>
                        {
                            session?.user?.role === "admin" && (
                                <Link href="/dashboard" className={pathName === "/dashboard" ? "bg-black font-bold text-white px-2 rounded" : "text-gray-500"}>Dashboard</Link>
                            )
                        }
                    </div>
                    {
                        isPending ? (
                            <>
                            </>
                        ) : (
                            <div className="flex gap-2 items-center">

                                {

                                    !session && (
                                        <>
                                            <Link href="/login"><Button variant="ghost">Login</Button></Link>
                                            <Link href="/sign-up"><Button >Get Started</Button></Link>
                                        </>
                                    )
                                }

                                {
                                    session && (
                                        <>
                                            <Sheet >
                                                <SheetTrigger render={<Button variant="outline">
                                                    <div className="relative">
                                                        <ShoppingCart />
                                                        {cart.length > 0 && (
                                                            <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                                {cart.length}
                                                            </span>
                                                        )}
                                                    </div>
                                                </Button>} />
                                                <SheetContent className="overflow-scroll z-100">
                                                    <SheetHeader>
                                                        <SheetTitle>Your Favourite Items</SheetTitle>
                                                        {/* <SheetDescription>
                                                            Make changes to your profile here. Click save when you&apos;re done.
                                                        </SheetDescription> */}
                                                    </SheetHeader>
                                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                                        {
                                                            cart.map((item) => (
                                                                <CartCard
                                                                    _id={item._id}
                                                                    key={item._id}
                                                                    productId={item.productId}
                                                                    quantity={item.quantity}
                                                                    onDecrease={() => decQuantity(item._id, item.quantity)}
                                                                    onIncrease={() => incQuantity(item._id, item.quantity)}
                                                                    onDelete={() => deleteCartItem(item._id)}
                                                                />
                                                            ))
                                                        }
                                                    </div>
                                                    <SheetFooter>
                                                        <Button type="submit">Checkout</Button>
                                                        <SheetClose render={<Button variant="outline">Close</Button>} />
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Avatar>
                                                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                                        <AvatarFallback>{session.user.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>

                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                                                        <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />

                                                        <Button onClick={
                                                            async () => {
                                                                const result = await signOut()
                                                                if (result.error) {
                                                                    alert("Fail to signout")
                                                                } else {
                                                                    useCartStore.setState({ cart: [] })
                                                                    router.push("/login")

                                                                }
                                                            }
                                                        }>Sign Out</Button>

                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>


                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </nav>
        </>
    )
}
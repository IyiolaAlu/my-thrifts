"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"


export default function SignUp() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const data = await signIn.email({
                email: form.email,
                password: form.password
            })

            if (data.error) {
                setError(data.error.message ?? "Fail to sign up")
            } else {
                router.push("/products")
            }

        } catch (error) {
            setError("Unexpected error occured")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center  -4">
                <Card className="w-full max-w-md shadow-xl border-gray-200">
                    <CardHeader className="flex flex-col">
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    id="email" type="email" placeholder="Enter your email" required />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    minLength={7}
                                    id="password" type="password" placeholder="Enter your password" required />
                            </div>
                            <CardFooter>
                                <Button size="lg" type="submit" disabled={loading}>{loading ? "Signing In..." : "Sign Up"}</Button>
                                <p>Have an account? <Link href="/sign-up" className="hover:underline">Sign Up</Link></p>
                            </CardFooter>
                        </form>
                    </CardContent>

                </Card>
            </div>
        </>
    )
}
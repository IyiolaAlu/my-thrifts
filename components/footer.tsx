import Link from "next/link";

export default function Footer(){
    return(
        <footer className="relative  min-h-100 bg-cover bg-center flex "
          style={{ backgroundImage: "url('/images/texture.png')" }}>
          <div className=" container max-w-2xl mx-auto flex flex-col gap-10 items-center md:flex-row md:gap-20 md:items-center">
            <div className="flex flex-col gap-6 order-1 md:order-0">
              <div className="flex flex-col gap-6">
                <p className="text-gray-400">INFO</p>
                <div>
                  <p className="text-gray-600">PRICING /</p>
                  <p className="text-gray-600">ABOUT /</p>
                  <p className="text-gray-600">CONTACT</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-gray-400">PRODUCTS</p>
                <div>
                  <p className="text-gray-600">SHIRTS</p>
                  <p className="text-gray-600">ACTIVE WEARS</p>
                  <Link href="/products" className="hover:underline text-gray-600">MORE</Link>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-[48px] md:text-[80px]">StyleWears</p>
            </div>
          </div>
        </footer>
    )
}
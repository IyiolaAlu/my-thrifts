import HomeProducts from "@/components/home-products";
import Image from "next/image";



export default async function Home() {

  return (
    <>
      <main
        
      >

        {/* <div className="absolute inset-0 bg-white opacity-20 mix-blend-soft-light pointer-events-none" /> */}
        <HomeProducts />

        <section className="container mx-auto p-5 ">
          <div className="text-center">
            <p className="font-bold text-2xl md:text-[48px]">OUR APPROACH TO FASHION DESIGN</p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At StyleWears, we blend creativity with craftsmanship to create
              fashion that transcends trends and stands the test of time. Each
              design is meticulously crafted, ensuring the highest quality and
              exquisite finish.
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:py-32">
            <div>
              <Image
                src={'/images/pic1.jpg'}
                alt="Picture 1"
                width={300}
                height={300}
              />
            </div>
            <div className="pt-10">
              <Image
                src={'/images/pic2.jpg'}
                alt="Picture 2"
                width={300}
                height={300}
              />
            </div>
            <div>
              <Image
                src={'/images/pic5.jpg'}
                alt="Picture 3"
                width={300}
                height={300}
              />
            </div>
            <div className="pt-10">
              <Image
                src={'/images/pic4.jpg'}
                alt="Picture 4"
                width={300}
                height={300}
              />
            </div>
          </div>
        </section>
      </main>

    </>
  )
}

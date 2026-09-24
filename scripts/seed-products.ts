import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const products = [
    { title: "Vintage Denim Shirt", price: 18000, description: "Classic 90s denim", category: "shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800" },
    { title: "Striped Cotton Shirt", price: 12000, description: "Casual everyday wear", category: "shirt", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800" },
    { title: "Linen Summer Shirt", price: 15000, description: "Light and breathable", category: "shirt", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800" },
    { title: "Graphic Print Tee", price: 8000, description: "Retro design", category: "shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" },
    { title: "Oxford Button-Up", price: 20000, description: "Formal essential", category: "shirt", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800" },

    { title: "Denim Shorts", price: 12000, description: "Distressed finish", category: "shorts", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800" },
    { title: "Cargo Shorts", price: 18000, description: "Utility pockets", category: "shorts", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800" },
    { title: "Chino Shorts", price: 11000, description: "Clean summer look", category: "shorts", image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800" },
    { title: "Athletic Shorts", price: 9000, description: "Gym-ready", category: "shorts", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800" },

    { title: "Baggy Jeans", price: 22000, description: "Y2K style", category: "trousers", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800" },
    { title: "Slim Fit Chinos", price: 16000, description: "Smart casual", category: "trousers", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800" },
    { title: "Corduroy Pants", price: 19000, description: "Warm texture", category: "trousers", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800" },
    { title: "Cargo Pants", price: 21000, description: "Streetwear essential", category: "trousers", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800" },
    { title: "Wide-Leg Trousers", price: 28000, description: "Flowing silhouette", category: "trousers", image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800" },

    { title: "Leather Biker Jacket", price: 45000, description: "Timeless edge", category: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800" },
    { title: "Denim Jacket", price: 28000, description: "Classic wash", category: "jackets", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800" },
    { title: "Bomber Jacket", price: 32000, description: "Street style", category: "jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800" },
    { title: "Puffer Jacket", price: 38000, description: "Winter warmth", category: "jackets", image: "https://images.unsplash.com/photo-1545594861-3bef43ff2b7f?w=800" },

    { title: "Oversized Hoodie", price: 18000, description: "Cozy fit", category: "hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800" },
    { title: "Zip-Up Hoodie", price: 20000, description: "Everyday layer", category: "hoodies", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800" },
    { title: "Graphic Hoodie", price: 22000, description: "Bold print", category: "hoodies", image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800" },
    { title: "Cropped Hoodie", price: 16000, description: "Trendy cut", category: "hoodies", image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800" },

    { title: "Two-Piece Suit", price: 55000, description: "Formal classic", category: "suits", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800" },
    { title: "Blazer", price: 35000, description: "Smart layer", category: "suits", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800" },
    { title: "Waistcoat", price: 18000, description: "Retro touch", category: "suits", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800" },
    { title: "Tuxedo Suit", price: 65000, description: "Evening wear", category: "suits", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800" },

    { title: "Gym Leggings", price: 18000, description: "Stretch fit", category: "activewear", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800" },
    { title: "Sports Bra", price: 10000, description: "Supportive", category: "activewear", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800" },
    { title: "Track Pants", price: 16000, description: "Comfortable", category: "activewear", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800" },
    { title: "Performance Tee", price: 12000, description: "Moisture-wicking", category: "activewear", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800" },
]

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {
        type: String,
        enum: ["shirt", "shorts", "trousers", "jackets", "hoodies", "suits", "activewear"],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
})

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("✅ Connected to MongoDB")

        await Product.deleteMany({})
        console.log("🗑️  Cleared existing products")

        const result = await Product.insertMany(products)
        console.log(`✅ Inserted ${result.length} products`)

        await mongoose.disconnect()
        console.log("✅ Done")
        process.exit(0)
    } catch (error) {
        console.error("❌ Error:", error)
        process.exit(1)
    }
}

seed()
export interface CommentTypes {
    _id: string
    productId: string
    userId: string
    userName: string
    comment: string
    createdAt?: Date
}

export interface ProductTypes{
    _id: string
    title: string
    image: string
    price: number
    description: string
    category?: string
    comments?: CommentTypes[]
    createdAt?: Date
    
}

export interface GetCartTypes{
    _id: string
    productId: ProductTypes
    quantity: number 
}

export interface GetCartTypesProps extends GetCartTypes{
   onIncrease: ()=> Promise<void>
    onDecrease: ()=>Promise<void>
    onDelete: ()=>Promise<void>
}

export interface ProductCardProps extends ProductTypes{
    onDelete?: ()=>Promise<void>
    onEdit?: ()=>Promise<void>
    onAddToCart?: ()=>Promise<void>
}

export interface ProductDetailsTypes extends ProductTypes{
    updatedAt: Date
}
export interface ProductDetailsProps {
    product: ProductDetailsTypes
}



import { create } from "zustand";
import { GetCartTypes } from "../models/model-types";
import axios, { AxiosError } from "axios";

interface CartStore {
    cart: GetCartTypes[];
    error: string | null;
    isLoading: boolean;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    getCart: () => Promise<void>
    updateCartQuantity: (cartId: string, quantity: number) => Promise<void>;
    removeFromCart: (cartId: string) => Promise<void>;
    clearCart: ()=> void
}

export const useCartStore = create<CartStore>((set) => ({
    cart: [],
    error: null,
    isLoading: false,
    addToCart: async (productId: string, quantity: number) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.post(`/api/cart`, {
                productId,
                quantity
            });
            set((state) => ({
                cart: state.cart.some((item) => item.productId?._id === res.data.productId?._id) ?
                    state.cart.map(item => item.productId?._id === res.data.productId?._id ? res.data : item)
                    : [...state.cart, res.data],
                isLoading: false,
                error: null
            }))
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>
            set({ error: axiosError.response?.data?.message || 'Failed to add to cart', isLoading: false })
        }
    },
    getCart: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.get(`/api/cart`);
            set({ cart: res.data, isLoading: false, error: null })

        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>
            set({ error: axiosError.response?.data?.message || 'Failed to fetch cart', isLoading: false })
        }
    },
    updateCartQuantity: async (cartId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.put(`/api/cart/${cartId}`, { quantity });
            set((state) => ({
                cart: state.cart.map((item) => item._id === cartId ? res.data : item),
                isLoading: false,
                error: null
            }))
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>
            set({ error: axiosError.response?.data?.message || 'Failed to update cart', isLoading: false })
        }
    },
    removeFromCart: async (cartId) => {
        set({ isLoading: true, error: null });

        try {
            await axios.delete(`/api/cart/${cartId}`);
            set((state) => ({
                cart: state.cart.filter((item) => item._id !== cartId),
                isLoading: false,
                error: null
            }));
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>
            set({ error: axiosError.response?.data?.message || 'Failed to delete cart item', isLoading: false })
        }
    },
    clearCart: ()=>{
        set({cart: [], isLoading:false, error:null})
    }
}));

import { create } from "zustand";
import { CommentTypes } from "../models/model-types"
import axios, { AxiosError } from "axios";

interface CommentStore {
    comments: CommentTypes[]
    error: string | null;
    isLoading: boolean;
    onAddToComment: (productId: string, comment: string) => Promise<void>
}

export const useCommentStore = create<CommentStore>((set) => ({
    comments: [],
    error: null,
    isLoading: false,
    onAddToComment: async (productId, comment) => {
        set({ error: null, isLoading: true })
        try {
            const res = await axios.post('/api/comments', {
                productId,
                comment
            })
            if (!res.data) {
                return
            } else {
                set((state) => ({
                    comments: [...state.comments, res.data],
                    isLoading: false,
                    error: null
                }))
                
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>
            set({ error: axiosError.response?.data?.message || 'Failed to add to comment', isLoading: false })
        }
    }
}))


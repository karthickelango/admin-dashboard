import { supabase } from "../../supabaseClient";
import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query"


// get all order api
export const useOrder = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

// get user order api
export const useOrderList = () => {
    return useQuery({
        queryKey: ['order_items'],
        queryFn: async () => {
            const { data, error } = await supabase.from('order_items').select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}
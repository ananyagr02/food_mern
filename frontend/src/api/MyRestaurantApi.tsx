import { Restaurant } from "@/types";
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery,useQueryClient } from 'react-query'; // or '@tanstack/react-query' for newer versions
import { toast } from "sonner";
// Hooks -> useMutation for POST and PUT request
// useQuery for GET request


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const queryClient = useQueryClient();

export const useGetMyRestaurant = () => {

    const token = localStorage.getItem('token');
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = token;
    }
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {};
        if (token) {
            headers['Authorization'] = token;
        } 
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers,
            
        });
        if(!response.ok){
            throw new Error("Failed to get restaurant");
        }
        return response.json(); // backend returns restaurant details to the user
    };

    const {data: restaurant, isLoading} = useQuery  // returns the body of response as data variable whose name is stated as restaurant
    ("fetchMyRestaurant", // naming the query 
        getMyRestaurantRequest);
    return {restaurant, isLoading}
}




export const useCreateMyRestaurant = () =>{
    // const {getAccessTokenSilently} = useAut
    
//   const navigate = useNavigate();

//   const [loggedInUser, setloggedInUser] = useState('')
//   useEffect(() => {  
//     setloggedInUser(localStorage.getItem('loggedInUser'))
// },[]);    
const queryClient = useQueryClient();

    const createMyRestaurantRequest = async(restaurantFormData: FormData):Promise<Restaurant> => {  // returns a promise of Restaurant type
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {};
        if (token) {
            headers['Authorization'] = token;
        }
    
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers,
            body: restaurantFormData, 
        });
        if(!response.ok){
            throw new Error("Failed to create restaurant");
        }
        return response.json(); // backend returns newly created and updated restaurant details to the user
    }

    const { mutateAsync: createRestaurant,
            isLoading, isSuccess, isError
        }
        = useMutation(createMyRestaurantRequest
            , {
                onSuccess: () => {
                    // Invalidate or refetch the restaurnat query after a successful update
                    queryClient.invalidateQueries("fetchMyRestaurant");
                    toast.success("Restaurant created");
                }
            }
        )
    if(isSuccess){
        toast.success("Restaurant created!");
    }
    if(isError){
        toast.error("Unable to create restaurant")
    }
    return {createRestaurant, isLoading};
}
import { User } from "@/types";
// import { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyUser = () => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json' // Add Content-Type header here
    };
    if (token) {
        headers['Authorization'] = token;
    }
    const getMyUserRequest = async () : Promise<User>=> {       // return type: Promise with user object in it
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "GET",
            headers
        })

        if(!response.ok){
            throw new Error("Failed to get user")
        }
        return response.json()
        }

        const {data: currentUser, isLoading, error} = useQuery("fetchCurrentUser", getMyUserRequest);
// useQuery has 2 parameters -> queryKey and queryFn
        if(error){
            toast.error(error.toString());
        }

        return { currentUser, isLoading}
    }




type UpdateMyUserRequest = {
    name: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string,
    addressLine1: string,
    city: string,
}
    export const useUpdateMyUser = () => {
        const queryClient = useQueryClient();

    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json' // Add Content-Type header here
    };
    if (token) {
        headers['Authorization'] = token;
    }
    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "PUT",
            headers,
            body: JSON.stringify(formData)
        })
        if(!response.ok){
            throw new Error("Failed to update user")
        }

        return response.json();
    };

    const { mutateAsync: updateUser, 
        isLoading,
        isSuccess,
        error,
        reset

    } = useMutation(updateMyUserRequest
        , {
        onSuccess: () => {
            // Invalidate or refetch the user query after a successful update
            queryClient.invalidateQueries("fetchCurrentUser");
            toast.success("User Profile Updated");
        }
    }
);

    if(isSuccess){
        toast.success("User Profile Updated")
    }

    if(error){
        toast.error(error.toString());
        reset();
    }
    return {
        updateUser, isLoading
    };
    }
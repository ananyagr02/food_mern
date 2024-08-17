import {z} from 'zod'
import { Form}  from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

    // , FormControl, FormDescription, FormField, FormItem, FormLabel }
// import { zodResolver } from '@hookform/resolvers/zod';
import DetailsSection from './DetailsSection';
import CuisinesSection from './CuisinesSection';
import { useForm} from 'react-hook-form';
import { Separator } from "@/components/ui/separator";
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';
import { useEffect } from 'react';
import { Restaurant } from '@/types';

const formSchema= z.object({ // define form fields along with any validation msgs
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    city: z.string({
        required_error: "city is required",
    }),
    country: z.string({
        required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error:"Delivery price is required",
        invalid_type_error: "must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error:"Estimated Delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select atleast one item",
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price:z.coerce.number().min(1, "price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: "image is required"})
})
.refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
    });
type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;  // onSave accepts a formData type object
    isLoading: boolean;
};

// function zodResolver(formSchema: z.ZodObject<{ // define form fields along with any validation msgs
//     restaurantName: z.ZodString; city: z.ZodString; country: z.ZodString; deliveryPrice: z.ZodNumber; estimatedDeliveryTime: z.ZodNumber; cuisines: z.ZodArray<z.ZodString, "atleastone">; menuItems: z.ZodArray<z.ZodObject<{ name: z.ZodString; price: z.ZodNumber; }, "strip", z.ZodTypeAny, { name: string; price: number; }, { name: string; price: number; }>, "many">; imageFile: z.ZodType<File, z.ZodTypeDef, File>;
// }, "strip", z.ZodTypeAny, { restaurantName: string; city: string; country: string; deliveryPrice: number; estimatedDeliveryTime: number; cuisines: [string, ...string[]]; menuItems: { name: string; price: number; }[]; imageFile: File; }, { restaurantName: string; city: string; country: string; deliveryPrice: number; estimatedDeliveryTime: number; cuisines: [string, ...string[]]; menuItems: { name: string; price: number; }[]; imageFile: File; }>) {
//     throw new Error('Function not implemented.');
// }


const ManageRestaurantForm = (
    {onSave, isLoading,restaurant}: Props
) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            cuisines: [],
            menuItems: [{name: "", price: 0}],
        } 
    });

    useEffect(() => {
        if(!restaurant){
            return;
        }  // we receive a new restaurant with details from frontend, now we need to create it and send to backend
            form.reset(restaurant);
        
    },[form, restaurant])
    const onSubmit = (formDataJson: RestaurantFormData) => {  // onSubmit runs only if all the validations are passed otherwise corresponding errors are returned
        const formData = new FormData();
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);               // key value pairs, http requests only deal with strings so we convert all numbers to string
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice).toString());
        formData.append("estimatedDeliveryTime", (formDataJson.estimatedDeliveryTime).toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);   // append the cuisine in the cuisine array at the specified syntax
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            // menuItem[0][name], menuItem[0][price] -> this is how the menuItem data is interpreted
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, (menuItem.price).toString());
        });
        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
            }
        onSave(formData);
    }
    return (
        <Form {...form}> {/*This Form is shadcn Form field that wraps react hook form under the hood */}
    <form 
    onSubmit = {form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'
    >
        <DetailsSection/>
        <Separator/>
        <CuisinesSection/>
        <Separator/>
        <MenuSection/>
        <Separator/>
        <ImageSection/>
        {isLoading ? <LoadingButton/> : <Button type = "submit">Submit</Button>}
        </form>  
        </Form>
    )
};
export default ManageRestaurantForm;

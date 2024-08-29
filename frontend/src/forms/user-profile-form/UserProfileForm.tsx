import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
// create form object with all the fields
// CLIENT-SIDE VALIDATION
const formSchema = z.object({
    email: z.string().optional(), // read only field
    name: z.string().min(3,"Name is required"),
    password: z.string().min(8, 'Password must be at least 8 characters').optional(), // Add password field with min length
    // confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters').optional(), // Add confirm password field with min length
    phoneNumber: z.string().min(10, 'Please enter a valid phone number').optional(),
    addressLine1: z.string().min(1,"Address Line 1 is required").optional(),
    city: z.string().min(1,"City is required").optional(),
    country: z.string().optional(),

})
// .refine((data) => data.password === data.confirmPassword, {
//     path: ['confirmPassword'],
//     message: 'Passwords do not match',
//   }); // Ensure passwords match


type UserFormData = z.infer<typeof formSchema>  // infer from zod framework the type of each field in form schema

type Props = {
    currentUser : User;
    onSave: (userProfileData : UserFormData) => void;  // onSave function receives user data of the type UserFormData but returns nothing so void written
    isLoading: boolean;
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {  // destructuring these props
    console.log("CURRRRRNETTT UZZER",currentUser)
    const form = useForm<UserFormData>({   // useForm hook from react hook form library and type of form is userFormData
        resolver: zodResolver(formSchema),  // handles validation
        defaultValues: currentUser,
    }
);
useEffect(() => {
    
    form.reset(currentUser)
    console.log("RESET KAR DIYA ", currentUser)
}, [currentUser, form])

    return (
        <Form {...form}> {/* Form is from shadcn , ...form is paasing all the stuff from form to Form */}
            <form onSubmit = {form.handleSubmit(onSave)}    // HTML form tag
            className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        view and change your profile information here
                    </FormDescription>
                </div>

                <FormField control = {form.control} name="email" render = {(field) => (
                    <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                            <Input id="email" {...field} readOnly className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                    </FormItem>)}/>
                    
                <FormField control = {form.control} name="name" render = {(field) => (
                    <FormItem>
                        <FormLabel htmlFor="name" >Name</FormLabel>
                        <FormControl>
                            <Input id="name" {...field}  className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}/>
                    <FormField control = {form.control} name="password" render = {(field) => (
                    <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                            <Input id="password" {...field}  type="password" className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}/>
                    {/* <FormField control = {form.control} name="confirmPassword" render = {(field) => (
                    <FormItem>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <FormControl>
                            <Input id="confirmPassword" {...field}  type="password" className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        {/*</FormControl>
                        <FormMessage/>
                    </FormItem>)}/> 
                    */}

                    <FormField control = {form.control} name="phoneNumber" render = {(field) => (
                    <FormItem>
                        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                        <FormControl>
                            <Input id="phoneNumber" {...field}  className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}/>
                    <div className="flex flex-col md:flex-row gap-4">
                    <FormField control = {form.control} name="addressLine1" render = {(field) => (
                    <FormItem className="flex-1">
                        <FormLabel htmlFor="addressLine1">Address Line 1</FormLabel>
                        <FormControl>
                            <Input id="addressLine1" {...field}  className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}/>

                    <FormField control = {form.control} name="city" render = {(field) => (
                    <FormItem className="flex-1">
                        <FormLabel htmlFor="city">City</FormLabel>
                        <FormControl>
                            <Input id="city" {...field}  className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}/>

                    <FormField control = {form.control} name="country" render = {(field) => (
                    <FormItem>
                        <FormLabel htmlFor="country">Country</FormLabel>
                        <FormControl>
                            <Input id="country" {...field}  className = "bg-white"/> {/*form is managed by react-hook-form so field object contains a bunch of info and properties sbout the input and sends it to Input to display it all */}
                        </FormControl>
                    </FormItem>)}/>

                    </div>
                    {isLoading ? <LoadingButton/> :<Button type= "submit" className="bg-orange-500">Submit</Button>}
            </form>
        </Form>
    )
}

export default UserProfileForm;

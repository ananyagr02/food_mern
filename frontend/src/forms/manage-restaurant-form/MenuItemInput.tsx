import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
    index: number;
    removeMenuItem: () => void;
    updateMenuItem: () => void;
};
const MenuItemInput = ({index, removeMenuItem, updateMenuItem}: Props) =>{  // destructuring the props
    const {control }= useFormContext();
    return ( <div className="flex flex-row items-end gap-2">
        <FormField 
        control={control} 
        name = {`menuItems.${index}.name`}  //ties the name field to the object in field array at a given index -> which menu item does the name belong to
        render = {({field}) =>  // destructure the field
        (<FormItem>
            <FormLabel className = "flex items-center gap-1">Name <FormMessage/>
            </FormLabel>
            <FormControl>
                <Input {...field} placeholder="Cheeze Pizza" className="bg-white" />
            </FormControl>
        </FormItem>)}
        />

<FormField 
        control={control} 
        name = {`menuItems.${index}.price`}  //ties the name field to the object in field array at a given index -> which menu item does the name belong to
        render = {({field}) =>  // destructure the field
        (<FormItem>
            <FormLabel className = "flex items-center gap-1">Price ((&#8377;)) <FormMessage/>
            </FormLabel>
            <FormControl>
                <Input {...field} placeholder="0.00" className="bg-white" />
            </FormControl>
        </FormItem>)}
        />
        <Button type = "button" onClick = {removeMenuItem} className = "bg-red-500 max-h-fit">Remove</Button>
        <Button type = "button" onClick = {updateMenuItem} className = "bg-red-500 max-h-fit">Update</Button>

    </div>
)}
export default MenuItemInput
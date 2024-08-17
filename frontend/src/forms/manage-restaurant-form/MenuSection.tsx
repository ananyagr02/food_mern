import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
    const { control } = useFormContext();
    const {fields, append, remove, replace} = useFieldArray({  // destructuring : fields is array of currently added menu items
        // append and remove allow us to add and remove to remove items from menu
        control,
        name: "menuItems",
    });
    const updateItem = (index, newItem) => {
        const updatedFields = [...fields];
        updatedFields[index] = newItem;
        replace(updatedFields);
        };
    return (
        <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Menu</h2>
            <FormDescription>
                Create your menu and give each item a name, price and image
            </FormDescription>
        </div>
        <FormField control = {control} name = "menuItems" render = {() => (
            <FormItem className = "flex flex-col gap-2">
                {fields.map((_, index) =>(
                    <MenuItemInput index={index} removeMenuItem = { ()=> remove(index)} updateItem = {updateItem}/>
                )
                )}
            </FormItem>
        )}/>
<Button type = "button" onClick = {() => append({name: "", price: ""})}>
    Add Menu Item
</Button>
        </div>
    )
}
export default MenuSection
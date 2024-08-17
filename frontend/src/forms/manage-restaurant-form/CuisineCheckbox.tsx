import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cuisine: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox = ({cuisine, field}: Props) => {
    
    return(
        <FormItem className = "flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox
                className="bg-white"
                checked = {field.value.includes(cuisine)} 
                 //field is array of the provided cuisines 
                onCheckedChange = {(checked : boolean) =>{
                    if(checked){
                        field.onChange([...field.value, cuisine])  // add the new cuisine to the old field array if the entered cuisine exists in the options
                    }
                    else{
                        field.onChange(
                        field.value.filter((value: string) => value!== cuisine)
                        );
                    }
                } } />
            </FormControl>
            <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
        </FormItem>
    )
}
export default CuisineCheckbox;
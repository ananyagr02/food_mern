import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm'
import { useCreateMyRestaurant, useGetMyRestaurant } from '@/api/MyRestaurantApi';
function ManageRestaurantPage() {
  const { createRestaurant, isPending} = useCreateMyRestaurant();
  const {restaurant} = useGetMyRestaurant();
  return (
    <ManageRestaurantForm restaurant = {restaurant} onSave = {createRestaurant} isLoading = {isPending}/>
  )
}

export default ManageRestaurantPage

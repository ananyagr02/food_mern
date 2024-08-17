import {Route,Routes} from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import Header1 from './components/Header1'
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfilePage from './pages/UserProfilePage';
const AppRoutes = () => {
  
  return (
    <>
  <Routes> 
    <Route path = '/' element = {<Layout showHero = {true}><HomePage/></Layout>}/> 

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    // private routes which require user authentication

    <Route path = '/home' element = {<Header1/>}></Route>
    <Route path = '/user-profile' element = {<Layout><UserProfilePage/></Layout>} />
    <Route path = '/manage-restaurant' element = {<Layout><ManageRestaurantPage/></Layout>} />
    <Route path = '*' element = {<Navigate to = "/"/>}/> 
  </Routes>
  </>
  )
}

export default AppRoutes;
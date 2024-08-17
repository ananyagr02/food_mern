import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
import { toast } from "sonner";
import foodImage from '../assets/food.jpg'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
interface LoginInfoType {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  success: boolean;
  error?: { details: { message: string }[] };
  jwtToken?: string;
  email?: string;
  name?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState<LoginInfoType>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log('LoginInfo -> ', LoginInfo);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page from refreshing on form submission
    const { email, password } = LoginInfo;

    if (!email || !password) {
      toast.error('All fields are required');
    }

    try {
      const url = `${API_BASE_URL}/api/my/user/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginInfo),
      });

      const result: LoginResponse = await response.json();

      const { message, success, error, jwtToken, name } = result;

      if (success) {
        toast.success(message);
        if (jwtToken && name) {
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', name);

          setTimeout(() => {
            navigate('/home'); // Redirect to home page after successful login
          }, 1000);
        }
      } else if (error) {
        const details = error.details?.[0].message;
        toast.error(details);
      
      } else {
        toast.error(message);
      }
      console.log(result);
    } catch (err : any) {
      toast.error(err.toString());
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen relative overflow-hidden">
          <div className="absolute inset-0  bg-cover bg-center bg-blend-saturation"
      style={{ backgroundImage: `url(${foodImage})` }}></div>

      <div className="relative z-10 container bg-gray-200 bg-opacity-75 text-black font-bold font-serif p-8 rounded-lg max-w-[400px] shadow-[8px_8px_24px_0_rgba(66,68,90,1)]">
        <h1 className="mb-5 text-2xl text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2.5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">Email</label>
            <input
              className="w-full bg-transparent text-slate-700 text-lg font-serif p-2.5 border-none outline-none border-b border-white placeholder-slate-800 placeholder-italic placeholder-text-sm mt-2 mb-2.5"
              onChange={handleChange}
              type="email"
              name="email"
              value={LoginInfo.email}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">Password</label>
            <input
              className="w-full bg-transparent text-slate-700 text-lg font-serif p-2.5 border-none outline-none border-b border-white placeholder-slate-800 placeholder-italic placeholder-text-sm mt-2 mb-2.5"
              onChange={handleChange}
              type="password"
              name="password"
              value={LoginInfo.password}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2.5 rounded-lg border-none text-white text-lg bg-slate-800"
          >
            Login
          </button>
          <span className="text-slate-800 text-xl">
            Don't have an account?
            <Link to="/signup" className="text-slate-800 text-xl border-b-2-black underline"> Sign up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
  export default Login;
  
//   return (
//     <div className="container flex justify-center items-center border-blue-700 max-w-[400px] h-screen w-screen">
//       <div className='flex flex-col'>
//       <h1 className='flex justify-center '>Login</h1>
//       <form onSubmit={handleLogin} className='flex flex-col gap-4'>
//         <div className='flex flex-col justify-center'>
//           <label htmlFor="email">Email</label>
//           <input className='bg-slate-500'
//             onChange={handleChange}
//             type="email"
//             name="email"
//             value={LoginInfo.email}
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className='flex flex-col'>
//           <label htmlFor="password">Password</label>
//           <input className='bg-slate-500'
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={LoginInfo.password}
//           />
//         </div>
//         <button type="submit" className='flex flex-1 bg-red-300 rounded-lg justify-center items-center w-40'>Login</button>
//         <span>
//           Don't have an account?
//           <Link to="/signup"> Sign up</Link>
//         </span>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

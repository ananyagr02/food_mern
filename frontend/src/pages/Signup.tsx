import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import foodImage from '../assets/food.jpg'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface SignupInfoType {
    name: string;
    email: string;
    password: string;
}

interface SignupResponse {
    message: string;
    success: boolean;
    error?: { details: { message: string }[] };
    jwtToken?: string;
    name?: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState<SignupInfoType>({
    name: '',
    email: '',
    password: '',
    });
    const [isClicked, setIsClicked] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignupInfo((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

    console.log('signupInfo -> ', signupInfo);

    const handleSignup = async (e: FormEvent) => {
    e.preventDefault(); // Prevents page from refreshing on form submission
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
        toast.error('All fields are required');
    }

    try {
        setIsClicked(!isClicked);
        const url = `${API_BASE_URL}/api/my/user/signup`;
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
        });
        
        const result: SignupResponse = await response.json();

        const { message, success, error, jwtToken } = result;

        if (success) {
        toast.success(message);
        if (jwtToken && name) {
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);

            setTimeout(() => {
            navigate('/home'); // Redirect to home page after successful signup
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
            <div className="absolute inset-0 bg-cover bg-center bg-blend-saturation"
                style={{ backgroundImage: `url(${foodImage})` }}
            ></div>
        
            <div className="relative z-10 container bg-gray-200 bg-opacity-75 text-black font-bold font-serif p-8 rounded-lg max-w-[400px] shadow-[8px_8px_24px_0_rgba(66,68,90,1)]">
                <h1 className = "text-2xl mb-5 w-full text-center">Sign Up</h1>
                <form onSubmit={handleSignup} className="flex flex-col gap-2.5">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-lg">Name</label>
                    <input
                    className="w-full bg-transparent text-slate-700 text-lg font-serif p-2.5 border-none outline-none border-b border-white placeholder-slate-800 placeholder-italic placeholder-text-sm mt-2 mb-2.5"
                    onChange={handleChange}
                    type="text"
                    name="name"
                    autoFocus
                    placeholder="Enter your name"
                    value={signupInfo.name}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-lg">Email</label>
                    <input
                    className="w-full bg-transparent text-slate-700 text-lg font-serif p-2.5 border-none outline-none border-b border-white placeholder-slate-800 placeholder-italic placeholder-text-sm mt-2 mb-2.5"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={signupInfo.email}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-lg">Password</label>
                    <input
                    className="w-full bg-transparent text-slate-700 text-lg font-serif p-2.5 border-none outline-none border-b border-white placeholder-slate-800 placeholder-italic placeholder-text-sm mt-2 mb-2.5"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={signupInfo.password}
                    />
                </div>
                <button type="submit" 
                // className=`{w-full p-2.5 rounded-lg border-none text-white text-lg bg-slate-800 ${isSubmitting ? 'animate-pulse' : ''}`
                // className={`w-full p-2.5 rounded-lg border-none text-white text-lg bg-slate-800 ${isSubmitting ? 'animate-pulse' : ''}`}
                className={`w-full p-2.5 rounded-lg border-none text-white text-lg bg-slate-800 ${isClicked ? 'bg-slate-800 hover:bg-gray-500' : 'hover:bg-slate-900'}`}

                >Signup</button>
                <span className="text-slate-800 text-xl">
                    Already have an account?
                    <Link to="/login" className="text-slate-800 text-xl border-b-2-black underline"> Login</Link>
                </span>
                </form>
            </div>
            </div>
        );
        }      
        export default Signup;

    //     return (
    //     <div className="container">
    //         <h1>Sign up</h1>
    //         <form onSubmit={handleSignup}>
    //         <div>
    //             <label htmlFor="name">Name</label>
    //             <input
    //             onChange={handleChange}
    //             type="text"
    //             name="name"
    //             autoFocus
    //             placeholder="Enter your name"
    //             value={signupInfo.name}
    //                 />
    //         </div>
    //         <div>
    //             <label htmlFor="email">Email</label>
    //             <input
    //             onChange={handleChange}
    //             type="email"
    //             name="email"
    //             placeholder="Enter your email"
    //             value={signupInfo.email}
    //             />
    //         </div>
    //         <div>
    //             <label htmlFor="password">Password</label>
    //             <input
    //             onChange={handleChange}
    //             type="password"
    //             name="password"
    //             placeholder="Enter your password"
    //             value={signupInfo.password}
    //             />
    //         </div>
    //         <button type="submit">Signup</button>
    //         <span>
    //             Already have an account?
    //             <Link to="/login"> Login</Link>
    //         </span>
    //         </form>
    //     </div>
    //     );
    // };


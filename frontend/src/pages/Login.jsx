// import { useState } from 'react';

// const Login = () => {
//     const [loginEmail, setLoginEmail] = useState('');
//     const [loginPassword, setLoginPassword] = useState('');
//     const [signupName, setSignupName] = useState('');
//     const [signupEmail, setSignupEmail] = useState('');
//     const [signupPassword, setSignupPassword] = useState('');

//     const handleLoginSubmit = (e) => {
//       e.preventDefault();
//       console.log("Login form submitted", loginEmail, loginPassword);
//       // Add your actual login logic here (e.g., API call)
//     };

//     const handleSignupSubmit = (e) => {
//       e.preventDefault();
//       console.log("Signup form submitted", signupName, signupEmail, signupPassword);
//       // Add your actual signup logic here (e.g., API call)
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden">
//                 {/* Login Form */}
//                 <div className="w-1/2 p-10">
//                     <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Login</h2>
//                     <form onSubmit={handleLoginSubmit}>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginEmail">Email</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="loginEmail" type="email" placeholder="Enter your email"
//                                 value={loginEmail}
//                                 onChange={(e) => setLoginEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginPassword">Password</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="loginPassword" type="password" placeholder="Enter your password"
//                                 value={loginPassword}
//                                 onChange={(e) => setLoginPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                             type="submit"
//                         >
//                             Login
//                         </button>
//                     </form>
//                 </div>

//                 {/* Separator Line */}
//                 <div className="m-auto">OR</div>

//                 {/* Signup Form */}
//                 <div className="w-1/2 p-10">
//                     <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Sign Up</h2>
//                     <form onSubmit={handleSignupSubmit}>
//                     <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupName">Name</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="signupName" type="text" placeholder="Enter your name"
//                                 value={signupName}
//                                 onChange={(e) => setSignupName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupEmail">Email</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="signupEmail" type="email" placeholder="Enter your email"
//                                 value={signupEmail}
//                                 onChange={(e) => setSignupEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupPassword">Password</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="signupPassword" type="password" placeholder="Enter your password"
//                                 value={signupPassword}
//                                 onChange={(e) => setSignupPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button
//                             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                             type="submit"
//                         >
//                             Sign Up
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
//------------------------------------------------
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    // Handle Login Submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setLoginMessage(`Success: ${data.message}`);
                console.log('Token:', data.token);
                // Save the token to localStorage or context for further use
                localStorage.setItem('token', data.token);
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                setLoginMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setLoginMessage('An error occurred. Please try again later.');
            console.error(error);
        }
    };

    // Handle Signup Submission
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: signupName,
                    email: signupEmail,
                    password: signupPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSignupMessage(`Success: ${data.message}`);
                console.log('User:', data.user);
            } else {
                setSignupMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setSignupMessage('An error occurred. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Login Form */}
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="loginEmail"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="loginEmail"
                                type="email"
                                placeholder="Enter your email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="loginPassword"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="loginPassword"
                                type="password"
                                placeholder="Enter your password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    {loginMessage && <p className="mt-4 text-center text-red-500">{loginMessage}</p>}
                </div>

                {/* Separator Line */}
                <div className="m-auto">OR</div>

                {/* Signup Form */}
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Sign Up</h2>
                    <form onSubmit={handleSignupSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="signupName"
                            >
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="signupName"
                                type="text"
                                placeholder="Enter your name"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="signupEmail"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="signupEmail"
                                type="email"
                                placeholder="Enter your email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="signupPassword"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="signupPassword"
                                type="password"
                                placeholder="Enter your password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    {signupMessage && <p className="mt-4 text-center text-green-500">{signupMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;

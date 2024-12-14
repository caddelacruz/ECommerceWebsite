'use client';

import { useEffect, useState } from 'react';
import { auth } from '../_util/firebase'; // Import the auth instance
import { onAuthStateChanged } from "firebase/auth";  // Firebase authentication listener
import Link from 'next/link';  
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [user, setUser] = useState(null);  // State to hold user data

  // Check the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  // Set user state if logged in
      } else {
        setUser(null);  // Reset user state if not logged in
      }
    });
    
    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user}/>
      <main className="py-8 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {/* Left Side: Login Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Hello, Welcome Back!</h2>
          <p className="text-xs text-gray-600 mb-6">Enter info to access your account.</p>
          <form className="space-y-4">
            <div className="relative">
              <image
                src="/image/email.png"
                alt="email Icon"
                className="absolute left-3 top-3 w-6 h-6 text-gray-500"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-3/4 pl-10 border rounded-lg px-4 py-2 ml-2"
              />
            </div>
            <div className="relative">
              <image
                src="/image/padlock.png"
                alt="Padlock Icon"
                className="absolute left-3 top-3 w-6 h-6 text-gray-500"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-3/4 pl-10 border rounded-lg px-4 py-2 ml-2"
              />
            </div>
            <div className="flex justify-between items-center w-3/4 text-xs">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-pink-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <div>
              <button className="w-3/4 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 mt-6">
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Sign Up/ Social Media Sign in Options */}
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-sm font-bold mb-7">Or Sign in with</h3>
          <div className="flex space-x-4 mb-10">
            <a href="apple.com" className="block">
              <button className="flex-1 hover:bg-gray-300">
                <image src="/image/apple.png" alt="Apple Icon" className="h-8 w-8 text-gray-600" />
              </button>
            </a>
            <a href="facebook.com" className="block">
              <button className="flex-1 hover:bg-gray-300 mx-5">
                <image src="/image/facebook.png" alt="Facebook Icon" className="h-8 w-8 text-gray-600" />
              </button>
            </a>
            <a href="" className="block">
              <button className="flex-1 hover:bg-gray-300">
                <image src="/image/google.png" alt="Google Icon" className="h-8 w-8 text-gray-600" />
              </button>
            </a>
          </div>
          <p className="text-xs text-gray-600 w-3/4 text-center mb-4">
            By clicking Sign In with Facebook, Google, or Apple, you are
            acknowledging and agreeing to the{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Terms & Conditions
            </a>{" "}
            of the Loyalty Program.{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Privacy Policy
            </a>.
          </p>
          <p className="text-sm text-center mb-2 mt-9">Don&apost have an account?</p>

          {/* Updated "Sign Up" Button with Link */}
          <Link href="/signup" className="block w-3/4">
            <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 mt-6">
              Sign Up
            </button>
          </Link>
        </div>
      </main>

      {/* Footer with Back to Shopping link at the top */}
      <Footer />
      <a
        href="/shop"
        className="block text-center text-black underline hover:text-pink-500 absolute bottom-12 left-0 right-0 p-4"
      >
        Back to Shopping
      </a>

      {/* Show user's name if logged in */}
      {user && (
        <div className="absolute top-12 right-0 text-sm text-gray-700">
          <p>Hello, {user.displayName || "User"}!</p> {/* Display the user's name */}
        </div>
      )}
    </div>
  );
};

export default Login;






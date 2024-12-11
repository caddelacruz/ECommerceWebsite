'use client';

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../_util/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation: Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Save user data to Firestore
      await addDoc(collection(db, "users"), {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Consider hashing the password before storing
        createdAt: new Date(),
      });
      alert("Signup successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error saving user data:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="py-8 px-6 w-1/3 mx-auto flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Re-enter password"
              className="w-full border rounded-lg px-4 py-2 mb-10"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
          >
            Sign Up
          </button>
        </form>
      </main>
      <Footer />
      <a
      href="/login"
      className="block text-center text-black underline hover:text-pink-500 absolute bottom-12 left-0 right-0 p-4"
    >
      Login
    </a>
    </div>
  );
};

export default Signup;


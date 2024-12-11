'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";  // Import the Header component
import { db } from '../_util/firebase'; // Ensure db is imported correctly
import { collection, getDocs } from 'firebase/firestore';

const Shop = () => {
  const categories = [
    { name: "Jackets", image: "jacket.png" },
    { name: "Dresses", image: "dress.png" },
    { name: "Pants", image: "pants.png" },
    { name: "Coats", image: "coat.png" },
    { name: "Skirts", image: "skirt.png" },
    { name: "Shorts", image: "shorts.png" },
    { name: "T-shirts", image: "tshirt.png" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(""); // Default to no category selected
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("CAD"); // Set the initial currency to CAD

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        let allProducts = [];

        // If no category is selected, fetch from all categories
        if (!selectedCategory) {
          for (const category of categories) {
            const categoryCollection = collection(db, category.name);
            const querySnapshot = await getDocs(categoryCollection);
            querySnapshot.docs.forEach(doc => allProducts.push(doc.data()));
          }
          setProducts(getRandomProducts(allProducts)); // Pick random products
        } else {
          // Fetch products for the selected category
          const categoryCollection = collection(db, selectedCategory);
          const querySnapshot = await getDocs(categoryCollection);
          const productsList = querySnapshot.docs.map(doc => doc.data());
          setProducts(productsList);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  // Function to get 6 random products from the given list
  const getRandomProducts = (allProducts) => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6); // Return 6 random products
  };

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toFixed(2);
    } else if (typeof price === "string") {
      const parsedPrice = parseFloat(price);
      return !isNaN(parsedPrice) ? parsedPrice.toFixed(2) : "N/A";
    }
    return "N/A";
  };

  return (
    <div>
      <Header setCurrency={setCurrency} />
      <div className="py-6 px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="flex space-x-6 overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedCategory(category.name)}
            >
              <Image
                src={`/image/${category.image}`}
                alt={`Image representing the ${category.name} category`}
                width={156}
                height={156}
                className="mb-2"
              />
              <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="py-6 px-4">
        <h2 className="text-xl font-bold mb-4">PRODUCTS</h2>
        {loading && <div>Loading products...</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="border p-4 shadow hover:shadow-lg bg-gray-200 w-50 h-75">
                <Image
                  src={`/image/${product.image}`}
                  alt={`Image of ${product.name}`}
                  width={1700}
                  height={170}
                  className="mb-4 mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm font-semibold text-gray-800">
                {currency === "CAD"
                  ? `CAD$${formatPrice(product.priceCAD)}`
                  : `USD$${formatPrice(product.priceUSD)}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;





'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBestSellerProducts } from '../_util/firebase'; // Import the fetchBestSellerProducts function
import Header from '../components/Header';
import Footer from '../components/Footer';



const Home = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]); // State to hold fetched BestSeller products
  const [currency, setCurrency] = useState('CAD');

  // Format price function
  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return '0.00'; // Return 0.00 if the price is invalid
    }
    return priceNumber.toFixed(2); // Format the price to two decimal places
  };

  useEffect(() => {
    // Fetch BestSeller products when the component mounts
    const fetchProducts = async () => {
      const products = await fetchBestSellerProducts();
      setBestSellerProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header setCurrency={setCurrency}/>

      {/* Banner Section */}
      <div className="relative">
        <Image
          src="/image/main.png"
          alt="Winter Collection Banner"
          width={1920}
          height={800}
          className="w-full h-auto"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h2 className="text-4xl font-bold">WINTER COLLECTION 2024</h2>
          <p className="text-xl mt-2">Get up to 30% Off New Arrivals</p>
          <Link href="/shop">
            <button className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-md text-lg">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>

      {/* Best Seller Section */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Best Seller</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestSellerProducts.length === 0 ? (
            <p>Loading Best Seller Products...</p>
          ) : (
            bestSellerProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="bg-gray-200 text-sm p-4 flex flex-col items-center">
                  <Image
                    src={`/image/${product.image}`}
                    alt='product image'
                    width={180}
                    height={180}
                    className=" object-cover mb-4"
                  />
                  <span>{product.name}</span>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm font-bold mt-1">
                    {currency === 'CAD'
                      ? `CAD$${formatPrice(product.priceCAD)}`
                      : `US$${formatPrice(product.priceUSD)}`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchNewArrivalProducts } from '../_util/firebase'; // Import the fetch function

const NewArrival = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [currency, setCurrency] = useState('CAD');

  useEffect(() => {
    const getNewArrivals = async () => {
      const products = await fetchNewArrivalProducts();
      setNewArrivals(products);
    };
    getNewArrivals();
  }, []);

  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return '0.00';
    }
    return priceNumber.toFixed(2);
  };

  return (
    <div>
      <Header setCurrency={setCurrency}/>
      <main className="py-6 px-4">
        <h1 className="text-xl font-bold mb-2">New Arrivals</h1>
        <p className="text-gray-700 mb-6">
          Discover the latest trends and fresh styles in our New Arrivals collection.
        </p>
        <div className="grid grid-cols-6 gap-6">
          {newArrivals.length === 0 ? (
            <p>No new arrivals available at the moment.</p>
          ) : (
            newArrivals.map((product, index) => (
              <div key={product.id} className="flex flex-col items-center">
                {/* Product image inside the light grey box */}
                <div className="border p-4 shadow hover:shadow-lg bg-gray-200 w-50 h-75 mb-4"> {/* Added margin here */}
                  <img
                    src={`/image/${product.image}`}  
                    alt={product.description || `New Arrival ${index + 1}`}
                    className="mb-4 mx-auto"
                  />
                </div>
                {/* Description and price below the box */}
                <div className="text-center">
                  <h3 className="text-sm text-gray-600">{product.description || `New Arrival ${index + 1}`}</h3>
                  <p className="text-sm font-semibold text-gray-800">
                  {currency === 'CAD'
                  ? `CAD$${formatPrice(product.priceCAD)}`
                  : `US$${formatPrice(product.priceUSD)}`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrival;




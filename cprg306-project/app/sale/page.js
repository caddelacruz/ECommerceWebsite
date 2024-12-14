'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../_util/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';

const Sale = () => {
  const [saleItems, setSaleItems] = useState([]);
  const [currency, setCurrency] = useState("CAD"); // Default to CAD

  useEffect(() => {
    const fetchSaleItems = async () => {
      try {
        const saleProducts = [];
        const collections = ["Coats", "Dresses", "Jackets", "Pants", "Shorts", "Skirts", "T-shirts"];

        for (let collectionName of collections) {
          const collectionRef = collection(db, collectionName);
          const q = query(collectionRef, where("tags", "array-contains", "Sale"));
          const querySnapshot = await getDocs(q);

          querySnapshot.docs.forEach(doc => {
            const data = doc.data();
            saleProducts.push({
              id: doc.id,
              description: data.description || "No description available",
              image: data.image || "https://via.placeholder.com/150",
              priceCAD: Number(data.priceCAD) || 0.00, // Ensure it's a number
              priceUSD: Number(data.priceUSD) || 0.00, // Ensure it's a number
              tags: data.tags || [],
            });
          });
        }
        setSaleItems(saleProducts);
      } catch (error) {
        console.error("Error fetching Sale items:", error);
      }
    };

    fetchSaleItems();
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
      <Header setCurrency={setCurrency} />
      <main className="py-6 px-4">
        <h2 className="text-xl font-bold mb-4">Sale</h2>
        <p className="text-gray-700 mb-6">
          Shop our best deals and enjoy great savings on your favorite items!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {saleItems.length > 0 ? (
            saleItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <div className="border p-4 shadow hover:shadow-lg bg-gray-200 w-50 h-75">
                  <Image
                    src={`/image/${item.image}`}
                    alt=' Image of {item.description}'
                    width={180}
                    height={180}
                    className="mb-4 mx-auto"
                  />
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-sm text-gray-600">{item.description}</h3>
                  <p className="text-sm font-semibold text-gray-800">
                    <span className="line-through">
                    {currency === "CAD"
                        ? `CAD$${formatPrice(item.priceCAD)}`
                        : `USD$${formatPrice(item.priceUSD)}`}

                    </span>{" "}
                    {currency === "CAD"
                        ? `CAD$${formatPrice(item.priceCAD * 0.7)}`
                        : `USD$${formatPrice(item.priceUSD * 0.7)}`}

                    {/* Apply 30% discount */}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No sale items available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sale;



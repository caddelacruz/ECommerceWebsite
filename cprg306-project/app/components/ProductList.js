import React from 'react';
import productData from './Product.json'; // Adjust path as needed

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {products.map((product, index) => {
        console.log("Product Image Path:", `/images/${product.image}`);  // Debug: Check image path
        return (
          <div key={index} className="flex flex-col items-center">
            {/* Product Image inside a light grey box */}
            <div className="border p-4 rounded-lg shadow hover:shadow-lg bg-gray-200">
              <Image
                src={`/images/${product.image}`}  // Assuming images are stored in the public/images/ directory
                alt={product.description}  // Using description as alt text for better accessibility
                width={150}
                height={150}
                className="mb-4 mx-auto"  // Optional margin for image
              />
            </div>

            {/* Product Description and Price outside the light grey box */}
            <h3 className="text-lg font-semibold mt-2">{product.description}</h3>
            <p className="text-sm text-gray-600">${product.priceCAD}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;

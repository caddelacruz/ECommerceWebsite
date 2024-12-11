import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ShoppingBag = () => {
  const [cartItems, setCartItems] = useState([]); // State for cart items (empty by default)
  const shippingCost = 10;
  const taxRate = 0.05;

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * taxRate;
    return subtotal + shippingCost + tax;
  };

  return (
    <div>
      <Header />
      <main className="py-8 px-6">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Looks Like Your Shopping Bag is Empty!
            </h2>
            <p className="text-gray-700 mb-6">
              Don’t miss out! Start shopping and fill your bag with your favorites.
            </p>
            <button
              onClick={() => window.location.href = '/shop'} // Redirect to SHOP page
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4">Cart</h2>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-start border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => setCartItems(prev => {
                            const newItems = [...prev];
                            newItems[index].quantity--;
                            if (newItems[index].quantity === 0) newItems.splice(index, 1);
                            return newItems;
                          })}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => setCartItems(prev => {
                            const newItems = [...prev];
                            newItems[index].quantity++;
                            return newItems;
                          })}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 mt-4">Shipping: Free on orders over CA$50</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>${(calculateSubtotal() * taxRate).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full mt-4 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
                onClick={() => alert('Proceeding to checkout...')}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingBag;

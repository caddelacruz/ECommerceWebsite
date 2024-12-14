'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { fetchTopSearchProducts, fetchProductsByCategory } from '../_util/firebase'; // Import necessary functions

const Header = ({ setCurrency }) => {
  const [selectedOption, setSelectedOption] = useState('CAD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [topSearchProducts, setTopSearchProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState('TOP SEARCH');
  const [user, setUser] = useState(null); // User state to store user info

  const options = [
    { flag: '/image/cad.png', country: 'Canada', currency: 'CAD' },
    { flag: '/image/usa.png', country: 'United States', currency: 'USD' },
  ];

  const selectedOptionData = options.find((option) => option.currency === selectedOption);

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSelectOption = (currency) => {
    setSelectedOption(currency);
    setCurrency(currency);
    setIsDropdownOpen(false);
  };

  const handleSearchIconClick = () => setIsSearchBoxOpen(!isSearchBoxOpen);
  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  
  const handleSubmitSearch = async () => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      setCategoryLabel('Products');
      return;
    }

    const searchCategory = searchQuery.toLowerCase();
    const categories = ['jackets', 'coats', 'dresses', 'pants', 'skirts', 'shorts', 't-shirts'];

    if (categories.includes(searchCategory)) {
      setCategoryLabel(searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1));
      const products = await fetchProductsByCategory(searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1));
      setFilteredProducts(products);
    } else {
      const filtered = topSearchProducts.filter((product) =>
        product.name.toLowerCase().includes(searchCategory)
      );
      setFilteredProducts(filtered);
      setCategoryLabel('Products');
    }
  };

  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return '0.00';
    }
    return priceNumber.toFixed(2);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchTopSearchProducts();
      setTopSearchProducts(products);
    };

    // Firebase Authentication logic
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user name from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid); // Assuming users are stored in the 'users' collection
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData); // Store user data (e.g., displayName)
        } else {
          console.log("No user data found in Firestore");
        }
      } else {
        setUser(null); // No user logged in
      }
    });

    fetchProducts();
  }, []);

  return (
    <header className="w-full">
      <div className="bg-black text-white text-sm py-2 flex justify-between px-6">
        <span>FREE SHIPPING ON ALL ORDERS OVER CA$50</span>
        <div className="flex items-center">
          <Image src={selectedOptionData.flag} alt="Country Flag" width={24} height={20} className='mr-2'/>
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="bg-black text-white border-none text-sm flex items-center"
            >
              <span className="mr-2">{selectedOptionData.country}</span>
              <span>{selectedOptionData.currency}</span>
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-white text-black border border-gray-300 mt-1 w-48 max-h-60 overflow-y-auto z-50 right-0">
                {options.map((option) => (
                  <li
                    key={option.currency}
                    onClick={() => handleSelectOption(option.currency)}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                  >
                    <Image src={option.flag} alt='Image of {option.country}' width={20} height={20} className="mr-2" />
                    <span className="mr-2">{option.country}</span>
                    <span>{option.currency}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Image src="/logo.png" alt="Company Logo" width={120} height={120} />
        <div className="flex space-x-24 text-gray-700">
          <Link href="/home">
            <span className="hover:text-black">Home</span>
          </Link>
          <Link href="/shop">
            <span className="hover:text-black">Shop</span>
          </Link>
          <Link href="/NewArrival">
            <span className="hover:text-black">New Arrival</span>
          </Link>
          <Link href="/sale">
            <span className="text-pink-500 hover:text-black">Sale</span>
          </Link>
        </div>

        <div className="flex space-x-4">
          <button onClick={handleSearchIconClick}>
            <Image src="/image/search.png" alt="Search Icon" width={24} height={24} />
          </button>
          <Link href="/login">
            <Image src="/image/profile.png" alt="Profile Icon" width={24} height={24} />
          </Link>
          <Link href="/ShoppingBag">
            <Image src="/image/shoppingbag.png" alt="Shopping Bag Icon" width={24} height={24} />
          </Link>
        </div>
      </nav>

      {/* Display user greeting */}
      {user && (
        <div className="absolute top-12 right-0 text-sm text-gray-700">
          <p>Hello, {user.name || 'User'}!</p> {/* Display user's name */}
        </div>
      )}

      {isSearchBoxOpen && (
        <div className="fixed inset-x-0 top-[80px] bg-white z-20 flex flex-col items-center p-4 mt-12 border-t">
          <div className="w-1/2 flex items-center border p-2 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 text-sm"
            />
            <button
              onClick={handleSubmitSearch}
              className="bg-pink-500 text-white py-2 px-4 ml-2 text-sm"
            >
              Submit
            </button>
          </div>

          <div className="py-6 px-4">
            <h2 className="text-xl font-bold mb-4">{categoryLabel}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredProducts.length > 0 &&
               filteredProducts.map((product) => (
                 <div key={product.id} className="flex flex-col items-center">
                   <div className="bg-gray-200 text-sm px-4 py-2 cursor-pointer hover:bg-gray-300 flex flex-col items-center">
                     <Image src={`/image/${product.image}`} alt='Image of {product.name}' width={1700} height={170} className='mx-auto mb-4' />
                     <h3 className="text-black font-medium mb-1">{product.name}</h3>
                     <p className="text-black">CA${formatPrice(product.price)}</p>
                   </div>
                 </div>
               ))}

            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

















import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBIfApVwYb2ypa8rgQHSC7D321tkKb9COU",
  authDomain: "katwalk-couture.firebaseapp.com",
  projectId: "katwalk-couture",
  storageBucket: "katwalk-couture.firebasestorage.app",
  messagingSenderId: "543835647008",
  appId: "1:543835647008:web:2e87ba8992342e8e32a045",
  measurementId: "G-SMCXT3HLXP"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch BestSeller Products
export const fetchBestSellerProducts = async () => {
  try {
    const bestSellerProducts = [];
    const collections = ["Coats", "Dresses", "Jackets", "Pants", "Shorts", "Skirts", "T-shirts"]; // List your collections here

    // Fetch only products with "BestSeller" tag from each collection
    for (let collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("tags", "array-contains", "BestSeller")); // Filter by "BestSeller" tag
      const querySnapshot = await getDocs(q);

      // Add products from this collection to the bestSellerProducts array
      querySnapshot.docs.forEach(doc => {
        bestSellerProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    console.log("Fetched Best Seller Products:", bestSellerProducts); // Log the fetched products
    return bestSellerProducts;
  } catch (error) {
    console.error("Error fetching Best Seller products:", error);
    return [];
  }
};

// Fetch TopSearch Products
export const fetchTopSearchProducts = async () => {
  try {
    const topSearchProducts = [];
    const collections = ["Coats", "Dresses", "Jackets", "Pants", "Shorts", "Skirts", "T-shirts"]; // List your collections here

    // Fetch only products with "TopSearch" tag from each collection
    for (let collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("tags", "array-contains", "TopSearch")); // Filter by "TopSearch" tag
      const querySnapshot = await getDocs(q);

      // Add products from this collection to the topSearchProducts array
      querySnapshot.docs.forEach(doc => {
        topSearchProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    console.log("Fetched Top Search Products:", topSearchProducts); // Log the fetched products
    return topSearchProducts;
  } catch (error) {
    console.error("Error fetching Top Search products:", error);
    return [];
  }
};

// Fetch New Arrival Products
export const fetchNewArrivalProducts = async () => {
  try {
    const newArrivalProducts = [];
    const collections = ["Coats", "Dresses", "Jackets", "Pants", "Shorts", "Skirts", "T-shirts"]; // List your collections here

    // Fetch only products with "NewArrival" tag from each collection
    for (let collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("tags", "array-contains", "NewArrival")); // Filter by "NewArrival" tag
      const querySnapshot = await getDocs(q);

      // Add products from this collection to the newArrivalProducts array
      querySnapshot.docs.forEach(doc => {
        newArrivalProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    console.log("Fetched New Arrival Products:", newArrivalProducts); // Log the fetched products
    return newArrivalProducts;
  } catch (error) {
    console.error("Error fetching New Arrival products:", error);
    return [];
  }
};

// Fetch Sale Products
export const fetchSaleItems = async () => {
  try {
    const saleProducts = [];
    const collections = ["Coats", "Dresses", "Jackets", "Pants", "Shorts", "Skirts", "T-shirts"];

    for (let collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("tags", "array-contains", "Sale"));
      const querySnapshot = await getDocs(q);

      console.log(`Collection: ${collectionName}, Docs: ${querySnapshot.docs.length}`); // Check if documents are fetched

      querySnapshot.docs.forEach(doc => {
        console.log(`Doc ID: ${doc.id}, Data: `, doc.data()); // Log each document
        saleProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    setSaleItems(saleProducts);
  } catch (error) {
    console.error("Error fetching Sale items:", error);
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const products = [];
    const collections = ["Coats", "Dresses", "Jackets", "Pants", "Shorts", "Skirts", "T-shirts"];

    // Check if the category is valid (one of the predefined collections)
    if (!collections.includes(category)) {
      console.error(`Invalid category: ${category}`);
      return products;
    }

    // Fetch products from the selected category collection
    const collectionRef = collection(db, category);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.docs.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log(`Fetched ${category} products:`, products);
    return products;
  } catch (error) {
    console.error(`Error fetching products from ${category}:`, error);
    return [];
  }
};

const auth = getAuth(app);

// Export app and db for other uses
export { app, db, auth };

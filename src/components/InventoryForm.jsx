import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const InventoryForm = ({ onFormSubmit }) => {

  const [count, setCount] = useState(0);
    const [type, setType] = useState("");

  

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!user) {
      console.error("No user signed in");
      return;
    }
  
    const data = {
     
      count: count,
      type: type,
    };
  
    // Here we are writing the data to Firestore
    await addDoc(collection(db, "users", user.uid, "Inventory"), data);
    onFormSubmit();
  
    setType("");
    setCount(0);
  
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
        <h1 className="text-3xl font-semibold">Add Inventory</h1>
      <label className="flex flex-col">
        <span className="text-gray-700">Type:</span>
        <input type="text" value={type} onChange={e => setType(e.target.value)} className="border mt-1 p-2 rounded-md" />
      </label>

      <label className="flex flex-col">
      <span className="text-gray-700">Count:</span>
      <input type="number" step="0.01" value={count} onChange={e => setCount(parseFloat(e.target.value))} className="border mt-1 p-2 rounded-md" />
      </label>

      

   

      <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white">Upload</button>
    </form>
  );
};

export default InventoryForm;

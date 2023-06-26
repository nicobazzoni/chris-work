import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const UploadForm = ({ onFormSubmit }) => {
  const [title, setTitle] = useState("");
  const [initBudget, setInitBudget] = useState(0);
  const [toDo, setToDo] = useState("");
  const [cost, setCost] = useState(0);

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
      title: title,
      initBudget: initBudget,
      toDo: toDo,
      cost: cost,
    };
  
    // Here we are writing the data to Firestore
    await addDoc(collection(db, "users", user.uid, "projects"), data);
  
    setTitle("");
    setInitBudget(0);
    setToDo("");
    setCost(0);
    onFormSubmit();
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <label className="flex flex-col">
        <span className="text-gray-700">Title:</span>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="border mt-1 p-2 rounded-md" />
      </label>

      <label className="flex flex-col">
      <span className="text-gray-700">Initial Budget:</span>
      <input type="number" step="0.01" value={initBudget} onChange={e => setInitBudget(parseFloat(e.target.value))} className="border mt-1 p-2 rounded-md" />
      </label>

      <label className="flex flex-col">
        <span className="text-gray-700">To Do:</span>
        <input type="text" value={toDo} onChange={e => setToDo(e.target.value)} className="border mt-1 p-2 rounded-md" />
      </label>

      <label className="flex flex-col">
        <span className="text-gray-700">Cost:</span>
        <input type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} className="border mt-1 p-2 rounded-md" />
      </label>

      <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white">Upload</button>
    </form>
  );
};

export default UploadForm;
